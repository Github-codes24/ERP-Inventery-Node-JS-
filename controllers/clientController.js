const Client = require("../models/clientModel");

const getNewSrNumber = async (req,res) => {
    try {
        const clients = await Client.find();
        const currentSrNo = clients.length + 1;
        return res.status(200).json({ success: true, srNo: currentSrNo });
    } catch (error) {
        console.error("Error getting new sr number:", error);
        return 1;
    }
}

const createClient = async (req, res) => {
    const {
      srNo,
      dealerName,
      manufacturerName,
      productName,
      productCode,
      description,
      hsnCode,
      companyPrice,
      applicableGst,
      buyingPrice,
      sellingPrice,
      mouValidity,
      technicalSpecification,
      date,
    } = req.body;
  
    const {
      teritaryAuthFile,
      pptFile,
      coverLetterFile,
      productCertificate,
      isoCertificate,
      brochureFile,
    } = req.files || {};
  
    // Validate each field separately
    const error = {}; 
    if (!srNo) error.srNo = "Serial Number (srNo) is required.";
    if (!dealerName) error.dealerName = "Dealer Name is required.";
    if (!manufacturerName) error.manufacturerName = "Manufacturer Name is required.";
    if (!productName) error.productName = "Product Name is required.";
    if (!productCode) error.productCode = "Product Code is required.";
    if (!description) error.description = "Description is required.";
    if (!hsnCode) error.hsnCode = "HSN Code is required.";
    if (!companyPrice) error.companyPrice = "Company Price is required.";
    if (!applicableGst) error.applicableGst = "Applicable GST is required.";
    if (!buyingPrice) error.buyingPrice = "Buying Price is required.";
    if (!sellingPrice) error.sellingPrice = "Selling Price is required.";
    if (!mouValidity) error.mouValidity = "MOU Validity is required.";
    if (!technicalSpecification) error.technicalSpecification = "Technical Specification is required.";
    if (!date) error.date = "Date is required.";
  
    if (!teritaryAuthFile) error.teritaryAuthFile = "Tertiary Authorization File is required.";
    if (!pptFile) error.pptFile = "PPT File is required.";
    if (!coverLetterFile) error.coverLetterFile = "Cover Letter File is required.";
    if (!productCertificate) error.productCertificate = "Product Certificate is required.";
    if (!isoCertificate) error.isoCertificate = "ISO Certificate is required.";
    if (!brochureFile) error.brochureFile = "Brochure File is required.";
  
    // If there are missing fields, return a detailed error message
    if (Object.keys(error).length > 0) {
      return res.status(400).json({
        message: "The following fields are missing or invalid:",
        error,
      });
    }
  
    try {
      const newClient = new Client({
        srNo,
        dealerName,
        manufacturerName,
        productName,
        productCode,
        description,
        hsnCode,
        companyPrice,
        applicableGst,
        buyingPrice,
        sellingPrice,
        mouValidity,
        technicalSpecification,
        date,
        teritaryAuthFile: teritaryAuthFile[0].path,
        pptFile: pptFile[0].path,
        coverLetterFile: coverLetterFile[0].path,
        productCertificate: productCertificate[0].path,
        isoCertificate: isoCertificate[0].path,
        brochureFile: brochureFile[0].path,
      });
  
      const savedClient = await newClient.save();
      return res.status(201).json({
        success: true,
        message: "Client created successfully.",
        data: savedClient,
      });
    } catch (error) {
      console.error("Error saving client:", error);
      return res.status(500).json({
        message: "Error creating client.",
        error: error.message,
      });
    }
};

  




const findClient = async (req, res) => {
    try {
        const { page = 1, limit = 10, dealerName } = req.query;

        // Parse page and limit as integers
        const currentPage = parseInt(page);
        const itemsPerPage = parseInt(limit);

        const skip = (currentPage - 1) * itemsPerPage;
        
        const data =  {};
        if(dealerName) {
            data.dealerName = dealerName
        };

        const totalCount = await Client.countDocuments(data);

        const clients = await Client.find(data)
        .select(
            "srNo dealerName manufacturerName productName productCode description hsnCode",
        )
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 }); 

        if (clients.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No clients found matching the criteria.",
            });
        }

        const totalPages = Math.ceil(totalCount / itemsPerPage);

        return res.status(200).json({ success: true, clients,
            pagination: {
                currentPage,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPrevPage: currentPage > 1,
                totalCount,
          }, });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const { id: clientId } = req.params;

        // Extract form data from req.body
        const {
            dealerName,
            manufacturerName,
            productName,
            productCode,
            description,
            hsnCode,
            companyPrice,
            applicableGst,
            buyingPrice,
            sellingPrice,
            mouValidity,
            technicalSpecification,
        } = req.body;

        // Initialize file paths
        let teritaryAuthFile = req.files?.teritaryAuthFile
            ? req.files.teritaryAuthFile[0].path
            : null;
        let pptFile = req.files?.pptFile ? req.files.pptFile[0].path : null;
        let coverLetterFile = req.files?.coverLetterFile
            ? req.files.coverLetterFile[0].path
            : null;
        let productCertificate = req.files?.productCertificate
            ? req.files.productCertificate[0].path
            : null;
        let isoCertificate = req.files?.isoCertificate
            ? req.files.isoCertificate[0].path
            : null;
        let brochureFile = req.files?.brochureFile
            ? req.files.brochureFile[0].path
            : null;

        // Find the existing client to retain old file paths if no new file is uploaded
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Update the file paths only if the new files are uploaded, else retain old ones
        teritaryAuthFile = teritaryAuthFile || client.teritaryAuthFile;
        pptFile = pptFile || client.pptFile;
        coverLetterFile = coverLetterFile || client.coverLetterFile;
        productCertificate = productCertificate || client.productCertificate;
        isoCertificate = isoCertificate || client.isoCertificate;
        brochureFile = brochureFile || client.brochureFile;

        // Prepare the update data object
        const updateData = {
            dealerName,
            manufacturerName,
            productName,
            productCode,
            description,
            hsnCode,
            companyPrice,
            applicableGst,
            buyingPrice,
            sellingPrice,
            mouValidity,
            technicalSpecification,
            teritaryAuthFile,
            pptFile,
            coverLetterFile,
            productCertificate,
            isoCertificate,
            brochureFile,
        };

        // Update the client data
        const updatedClient = await Client.findByIdAndUpdate(
            clientId,
            updateData,
            { new: true },
        );

        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }

        return res.status(200).json({ success: true, updatedClient });
    } catch (error) {
        console.error("Error updating client:", error);
        return res
            .status(500)
            .json({ message: "Error updating client", error: error.message });
    }
};


const getClientById = async (req, res) => {
    try {
        const clientId = req.params.id;

        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ success: true, client });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// get mou validity , send data in years 1 to 10
const getMouValidity = async (req, res) => {
    try {
        const mouValidity = ["1 year", "2 years", "3 years", "4 years", "5 years", "6 years", "7 years", "8 years", "9 years", "10 years"];
        
        return res.status(200).json({ success: true, mouValidity });
    } catch (error) {
        console.error("Error getting MOU validity:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
//get applicable gst 
const getApplicableGst = async (req, res) => {
    try {
        const applicableGst = ["5%", "12%", "18%"];
        
        return res.status(200).json({ success: true, applicableGst });
    } catch (error) {
        console.error("Error getting applicable GST:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getManufacturerName = async (req, res) => {
    try {
        return res.status(200).json({ success: true, manufacturerNames:["Ramu","Shamu","Kalu"] });
    } catch (error) {
        console.error("Error getting manufacturer names:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
// Export all the functions at the end
module.exports = {
    createClient,
    findClient,
    updateClient,
    getClientById,
    getNewSrNumber,
    getMouValidity,
    getApplicableGst,
    getManufacturerName
};