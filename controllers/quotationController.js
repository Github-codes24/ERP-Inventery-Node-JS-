const Quotation = require("../models/quotation");
const { State, City } = require("country-state-city");


const getNewSrNumber = async (req, res) => {
  try {
    const clients = await Quotation.find();
     const currentSrNo = clients.length + 1;
    const companyName = "unisol";
    const email = "unisole@gmail.com";
    const address = "nashik, Maharashtra";
    const mobile = "9735792358";
    const state="Maharashtra";
    const city = "nashik";
    const country = "India";
    const zipCode = "422101";
    
    return res.status(200).json({
      success: true,
      srNo: currentSrNo,
      companyName:companyName,
      email:email,
      address:address,
      mobile:mobile,
      city:city,
      state:state,
      country:country,
      zipCode:zipCode
    });
  } catch (error) {
    console.error("Error getting new serial number:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the serial number.",
      error: error.message,
    });
  }
};

// const createQuotation = async (req, res) => {
//   try {
   
//     const {
//       quotationNo,
//       quotationName,
//       quotationDate,
//       validity,
//       from,
//       to,
//       bankDetails,
//       items,
//       termsAndConditions,
//       subtotal,
//       totalDiscountPercentage,
//       totalDiscountAmount,
//       taxes,
//       netAmount,
//     } = req.body;

//     if (
//       !quotationNo ||
//       !quotationDate ||
//       !from ||
//       !from.companyName ||
//       !from.email ||
//       !from.mobile ||
//       !to ||
//       !to.customerName ||
//       !to.address ||
//       !bankDetails ||
//       !bankDetails.bankName ||
//       !bankDetails.accountName ||
//       !bankDetails.accountType ||
//       !bankDetails.ifscCode ||
//       !subtotal ||
//       !netAmount
//     ) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

    
//     const newQuotation = new Quotation({
//       quotationNo,
//       quotationName,
//       quotationDate,
//       validity,
//       from,
//       to,
//       bankDetails,
//       items,
//       termsAndConditions,
//       subtotal,
//       totalDiscountPercentage,
//       totalDiscountAmount,
//       taxes,
//       netAmount,
//     });

    
//     const savedQuotation = await newQuotation.save();
//     return res.status(201).json(savedQuotation);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const createQuotation = async (req, res) => {
  try {
    const {
      quotationNo,
      quotationName,
      quotationDate,
      validity,
      from,
      to,
      bankDetails,
      items,
      termsAndConditions,
      subtotal,
      totalDiscountPercentage,
      taxes,
      netAmount,
    } = req.body;

    // Validate required fields
    const missingFields = [];

    // Check if essential fields are missing
    if (!quotationNo) missingFields.push("quotationNo");
    if (!quotationName) missingFields.push("quotationName");
    if (!quotationDate) missingFields.push("quotationDate");
    if (!validity) missingFields.push("validity");
    
    // Validate "from" field
    if (!from) {
      missingFields.push("from");
    } else {
      if (!from.companyName) missingFields.push("from.companyName");
      if (!from.companyAddress) missingFields.push("from.companyAddress");
      if (!from.companyCountry) missingFields.push("from.companyCountry");
      if (!from.companyState) missingFields.push("from.companyState");
      if (!from.companyCity) missingFields.push("from.companyCity");
      if (!from.companyZipcode) missingFields.push("from.companyZipcode");
      if (!from.companyEmail) missingFields.push("from.companyEmail");
      if (!from.companyMobile) missingFields.push("from.companyMobile");
    }

    // Validate "to" field
    if (!to) {
      missingFields.push("to");
    } else {
      if (!to.customerName) missingFields.push("to.customerName");
      if (!to.customerAddress) missingFields.push("to.customerAddress");
      if (!to.customerCountry) missingFields.push("to.customerCountry");
      if (!to.customerState) missingFields.push("to.customerState");
      if (!to.customerCity) missingFields.push("to.customerCity");
      if (!to.customerZipcode) missingFields.push("to.customerZipcode");
      if (!to.customerEmail) missingFields.push("to.customerEmail");
      if (!to.customerMobile) missingFields.push("to.customerMobile");
    }

    // Validate "bankDetails" field
    if (!bankDetails) {
      missingFields.push("bankDetails");
    } else {
      if (!bankDetails.bankName) missingFields.push("bankDetails.bankName");
      if (!bankDetails.accountNumber) missingFields.push("bankDetails.accountNumber");
      if (!bankDetails.accountType) missingFields.push("bankDetails.accountType");
      if (!bankDetails.ifscCode) missingFields.push("bankDetails.ifscCode");
      if (!bankDetails.branchName) missingFields.push("bankDetails.branchName");
      if (!bankDetails.address) missingFields.push("bankDetails.address");
    }

    // Additional fields validation
    if (!subtotal) missingFields.push("subtotal");
    if (!totalDiscountPercentage) missingFields.push("totalDiscountPercentage");
    if (!taxes) missingFields.push("taxes");
    if (!netAmount) missingFields.push("netAmount");

    // Check for any missing fields
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "The following fields are required:",
        missingFields,
      });
    }

    // Check for duplicate quotation number
    const existingQuotation = await Quotation.findOne({ quotationNo });
    if (existingQuotation) {
      return res.status(400).json({ message: "Quotation with the same quotation number already exists." });
    }

    // Create a new quotation
    const newQuotation = new Quotation({
      quotationNo,
      quotationName,
      quotationDate,
      validity,
      from,
      to,
      bankDetails,
      items,
      termsAndConditions,
      subtotal,
      totalDiscountPercentage,
      taxes,
      netAmount,
    });

    // Save the quotation to the database
    const savedQuotation = await newQuotation.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Quotation created successfully!",
      quotation: savedQuotation,
    });
  } catch (error) {
    // Send error response
    console.error("Error creating quotation:", error);
    return res.status(500).json({
      message: "An error occurred while creating the quotation.",
      error: error.message,
    });
  }
};




const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    return res.status(200).json(quotation);
  } catch (error) {
  
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuotation = await Quotation.findById(id);

    if (!deletedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    if (deletedQuotation.isDeleted) {
      return res.status(400).json({ message: "Quotation already deleted" });
    }

    deletedQuotation.isDeleted = true;
    await deletedQuotation.save();
    
    return res.status(200).json({ success: true , message: "Quotation deleted successfully" });
  
  } catch (error) {
    return res.status(500).json({  success: false , message: "Server error", error });
  }
};


const updateQuotation = async (req, res) => {
  try {
    const {id} = req.params; 
    const updateData = req.body;

    const updatedQuotation = await Quotation.findByIdAndUpdate(id,
      updateData,
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!updatedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    return res.status(200).json({ message: "Quotation updated successfully", updatedQuotation });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
const getAllQuotations = async (req, res) => {
  try {
    const {quotationName,  page = 1, limit = 10} = req.query;

     // Parse page and limit as integers
     const currentPage = parseInt(page);
     const itemsPerPage = parseInt(limit);

     const skip = (currentPage - 1) * itemsPerPage;

    const filter = { isDeleted: false }; 

    if (quotationName) {
      filter.quotationName = quotationName; 
    }

    // Get total count of matching documents
    const totalCount = await Quotation.countDocuments(filter);

    const quotations = await Quotation.find(filter).select('quotationNo quotationName customerName to.customerState validity ').skip(skip)
    .limit(itemsPerPage).sort({createdAt: -1 });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (!quotations.length) {
      return res.status(404).json({ message: "No quotations found" });
    }

    return res.status(200).json({
      success: true,
      message: "Retrieved Quatations successfully",
      data: {
        quotations,
        pagination: {
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
          totalCount,
        },
    }});
  } catch (error) {
   return  res.status(500).json({ message: "Server error", error });
  }
};


const getCountry =(req,res)=>{
  try{
    // const countries = State.getCountryList().map((country) => ({
    //   name: country.name,
    //   isoCode: country.isoCode,
    // }));
    const countries = [
      {
        name: "India",
        isoCode: "IN",
      }
    ]
    return res.status(200).json({
      success: true,
      data: countries,
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getStates = async (req, res) => {
  try {
    const countries = req.query.country;
    const states = State.getStatesOfCountry(countries).map((state) => ({
      name: state.name,
      isoCode: state.isoCode,
    }));

    return res.status(200).json({
      success: true,
      data: states,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCities = async (req, res) => {
  try {
    const { stateCode, country } = req.query;

    if (!stateCode) {
      return res.status(400).json({
        success: false,
        message: "State code is required",
      });
    }

    const cities = City.getCitiesOfState(country, stateCode).map((city) => ({
      name: city.name,
    }));

    return res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomerNames = (req,res)=>{
  const names = ["Ramu","Shamu","Kalu"];
  res.status(200).json({
    success:true,
    data:names
  })
}

//get terms and conditions

const getTermsAndConditions = async (req, res) => {
  try {
  const terms = {
    paymentTerms: "50% advance and 50% after delivery",
    deliveryTime: "30 days from the date of order",
    warranty: "1 year warranty on all products",
  }
    
    return res.status(200).json({
      success: true,
      terms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createQuotation,
  getQuotationById,
  deleteQuotationById,
  updateQuotation,
  getAllQuotations,
  getNewSrNumber,
  getStates,
  getCities,
  getCountry,
  getCustomerNames,
  getTermsAndConditions
};