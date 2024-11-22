const Client = require("../models/clientModel");

const createClient = async (req, res) => {
    try {
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

        const teritaryAuthFile = req.files?.teritaryAuthFile?.[0]?.path || null;
        const pptFile = req.files?.pptFile?.[0]?.path || null;
        const coverLetterFile = req.files?.coverLetterFile?.[0]?.path || null;
        const productCertificate =
            req.files?.productCertificate?.[0]?.path || null;
        const isoCertificate = req.files?.isoCertificate?.[0]?.path || null;
        const brochureFile = req.files?.brochureFile?.[0]?.path || null;

        const client = new Client({
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
            teritaryAuthFile,
            pptFile,
            coverLetterFile,
            productCertificate,
            isoCertificate,
            brochureFile,
        });

        const createdClient = await client.save();
        return res.status(201).json({
            success: true,
            message: "Client created successfully",
            createdClient,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating client",
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

// Export all the functions at the end
module.exports = {
    createClient,
    findClient,
    updateClient,
    getClientById,
};