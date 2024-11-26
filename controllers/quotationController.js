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

    
    return res.status(200).json({
      success: true,
      srNo: currentSrNo,
      companyName:companyName,
      email:email,
      address:address,
      mobile:mobile,
      city:city,
      state:state
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
      totalDiscountAmount,
      taxes,
      netAmount,
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!quotationNo) missingFields.push("quotationNo");
    if (!quotationDate) missingFields.push("quotationDate");
    if (!from) {
      missingFields.push("from");
    } else {
      if (!from.companyName) missingFields.push("from.companyName");
      if (!from.email) missingFields.push("from.email");
      if (!from.mobile) missingFields.push("from.mobile");
    }
    if (!to) {
      missingFields.push("to");
    } else {
      if (!to.customerName) missingFields.push("to.customerName");
      if (!to.address) missingFields.push("to.address");
    }
    if (!bankDetails) {
      missingFields.push("bankDetails");
    } else {
      if (!bankDetails.bankName) missingFields.push("bankDetails.bankName");
      if (!bankDetails.accountName)
        missingFields.push("bankDetails.accountName");
      if (!bankDetails.accountType)
        missingFields.push("bankDetails.accountType");
      if (!bankDetails.ifscCode) missingFields.push("bankDetails.ifscCode");
    }
    if (!subtotal) missingFields.push("subtotal");
    if (!netAmount) missingFields.push("netAmount");

    // If any fields are missing, return a detailed error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "The following fields are missing:",
        missingFields,
      });
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
      totalDiscountAmount,
      taxes,
      netAmount,
    });

    // Save the quotation to the database
    const savedQuotation = await newQuotation.save();

    // Send success response
    return res.status(201).json({
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

    const quotations = await Quotation.find(filter).select('quotationNo quotationName customerName to.cityStateZip validity ').skip(skip)
    .limit(itemsPerPage);

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

const getClientNames = (req,res)=>{
  const names = ["Ramu","Shamu","Kalu"];
  res.status(200).json({
    success:true,
    data:names
  })
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
  getClientNames
};