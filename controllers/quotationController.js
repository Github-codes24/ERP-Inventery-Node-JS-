const Quotation = require("../models/quotation");


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

    // if (
    //   !quotationNo ||
    //   !quotationDate ||
    //   !from ||
    //   !from.companyName ||
    //   !from.email ||
    //   !from.mobile ||
    //   !to ||
    //   !to.customerName ||
    //   !to.address ||
    //   !bankDetails ||
    //   !bankDetails.bankName ||
    //   !bankDetails.accountName ||
    //   !bankDetails.accountType ||
    //   !bankDetails.ifscCode ||
    //   !subtotal ||
    //   !netAmount
    // ) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }

    
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

    
    const savedQuotation = await newQuotation.save();
    return res.status(201).json(savedQuotation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    
    return res.status(200).json({ message: "Quotation deleted successfully", deletedQuotation });
  
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
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

module.exports = {
  createQuotation,
  getQuotationById,
  deleteQuotationById,
  updateQuotation,
  getAllQuotations
};