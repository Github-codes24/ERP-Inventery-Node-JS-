const Tender = require('../models/tenderModel');



const getNewSrNumber = async (req,res) => {
  try {
      const clients = await Tender.find();
      const currentSrNo = clients.length + 1;
      return res.status(200).json({ success: true, srNo: currentSrNo });
  } catch (error) {
      console.error("Error getting new sr number:", error);
      return 1;
  }
}


const createTender = async (req, res) => {
  try {
    const {
      tenderID, tenderName, title, issueDate, tenderFloatingDate, description,
      bidderName, documentDownloadStartDate, documentDownloadEndDate,
      bidSubmissionStartDate, bidSubmissionEndDate, bidValidity,
      prebidMeetingAddressPortal, technicalBidOpeningDate, periodOfWork,
      location, pincode, bidOpeningPlace, productCategory, natureOfWork,
      proposalsInvitedBy, dateOfOpeningFinancialProposals, modeOfSubmittingProposals,
      tenderWebsite, costOfRPFDocument, earnestMoneyDeposit, modeOfPayment,
      amount, bankName, performanceSecurity, methodOfSelection, objectionCharges,
      authorizedManager, authorizedPerson
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'tenderID', 'tenderName', 'title', 'issueDate', 'tenderFloatingDate',
      'description', 'bidderName', 'documentDownloadStartDate', 'documentDownloadEndDate',
      'bidSubmissionStartDate', 'bidSubmissionEndDate', 'bidValidity', 'prebidMeetingAddressPortal',
      'technicalBidOpeningDate', 'periodOfWork', 'location', 'pincode', 'bidOpeningPlace',
      'productCategory', 'natureOfWork', 'proposalsInvitedBy', 'dateOfOpeningFinancialProposals',
      'modeOfSubmittingProposals', 'tenderWebsite', 'costOfRPFDocument', 'earnestMoneyDeposit',
      'modeOfPayment', 'amount', 'bankName', 'performanceSecurity', 'methodOfSelection',
      'objectionCharges', 'authorizedManager', 'authorizedPerson'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Process stock items
    const stockItems = Array.isArray(req.body.stockItems) ? 
      req.body.stockItems.map(item => ({
        stockName: item.stockName,
        quantity: Number(item.quantity),
        unit: item.unit,
        description: item.description,
        Rate: Number(item.Rate),
        projectBidTotal: Number(item.projectBidTotal)
      })) : [];

    // Process file uploads
    const documents = {};
    const fileFields = [
      'tenderCopy', 'technicalDocuments', 'tenderFees', 'emdCopy',
      'boq', 'pricing', 'performanceGuarantee', 'mou', 'other'
    ];

    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        documents[field] = req.files[field][0].path;
      }
    });


  const existingtenderID = await Tender.findOne({ tenderID });
   
   if (existingtenderID) {
      return res.status(400).json({
        success: false,
        message: `tender ID '${tenderID}' already exists.`,
      });
    }


    // Create and save tender
    const newTender = new Tender({
      tenderID, tenderName, title, issueDate, tenderFloatingDate, description,
      bidderName, documentDownloadStartDate, documentDownloadEndDate,
      bidSubmissionStartDate, bidSubmissionEndDate, bidValidity,
      prebidMeetingAddressPortal, technicalBidOpeningDate, periodOfWork,
      location, pincode, bidOpeningPlace, productCategory, natureOfWork,
      proposalsInvitedBy, dateOfOpeningFinancialProposals, modeOfSubmittingProposals,
      tenderWebsite, costOfRPFDocument, earnestMoneyDeposit, modeOfPayment,
      amount, bankName, performanceSecurity, methodOfSelection, objectionCharges,
      authorizedManager, authorizedPerson, stockItems, ...documents
    });

    const savedTender = await newTender.save();

    return res.status(201).json({
      success: true,
      message: "Tender created successfully.",
      data: savedTender
    });

  } catch (error) {
    console.error("Error saving tender:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the tender.",
      error: error.message
    });
  }
};


// Get all tenders
const getAllTenders = async (req, res) => {
  try {
    // Extract the query parameters (page, limit, and other filters)
    const { tenderID,page = 1, limit = 10  } = req.query;

    // Initialize the filter object
    const filter = { };

    // If tenderID is provided, add it to the filter
    if (tenderID) {
      filter.tenderID = tenderID;
    }

    // Parse page and limit as integers
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch total count of tenders based on the filter
    const totalCount = await Tender.countDocuments(filter);

    // Fetch tenders with pagination based on the filter
    const tenders = await Tender.find(filter)
      .select("tenderID title issueDate authorizedPerson") // Select relevant fields
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Handle case when no tenders are found
    if (tenders.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No tenders found.",
      });
    }

    // Respond with tenders and pagination data
    return res.status(200).json({
      success: true,
      message: "Tenders retrieved successfully.",
      data: {
        tenders,
        pagination: {
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
          totalCount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching tenders.",
      error: error.message,
    });
  }
};



// Get a tender by ID
const getTenderById = async (req, res) => {
    try {
        const { id } = req.params;
        const tender = await Tender.findById(id); 
        if (!tender) {
            return res.status(404).json({
                success: false,
                message: "Tender not found.",
            });
        }
        return res.status(200).json({
            success: true,
            data: tender,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the tender.",
            error: error.message,
        });
    }
};



const updateTender = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Tender ID is required.",
      });
    }

    const tender = await Tender.findById(id);

    if (!tender) {
      return res.status(404).json({
        success: false,
        message: "Tender not found.",
      });
    }

    // Extract fields from request body
    const {
      tenderID, tenderName, title, issueDate, tenderFloatingDate, description,
      bidderName, documentDownloadStartDate, documentDownloadEndDate,
      bidSubmissionStartDate, bidSubmissionEndDate, bidValidity,
      prebidMeetingAddressPortal, technicalBidOpeningDate, periodOfWork,
      location, pincode, bidOpeningPlace, productCategory, natureOfWork,
      proposalsInvitedBy, dateOfOpeningFinancialProposals, modeOfSubmittingProposals,
      tenderWebsite, costOfRPFDocument, earnestMoneyDeposit, modeOfPayment,
      amount, bankName, performanceSecurity, methodOfSelection, objectionCharges,
      authorizedManager, authorizedPerson
    } = req.body;

    // Process stock items
    const stockItems = Array.isArray(req.body.stockItems) ? 
      req.body.stockItems.map(item => ({
        stockName: item.stockName,
        quantity: Number(item.quantity),
        unit: item.unit,
        description: item.description,
        Rate: Number(item.Rate),
        projectBidTotal: Number(item.projectBidTotal)
      })) : [];

    // Process file uploads
    const documents = {};
    const fileFields = [
      'tenderCopy', 'technicalDocuments', 'tenderFees', 'emdCopy',
      'boq', 'pricing', 'performanceGuarantee', 'mou', 'other'
    ];

    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        documents[field] = req.files[field][0].path;
      }
    });

    // Build update object
    const updateData = {
      tenderID, tenderName, title, issueDate, tenderFloatingDate, description,
      bidderName, documentDownloadStartDate, documentDownloadEndDate,
      bidSubmissionStartDate, bidSubmissionEndDate, bidValidity,
      prebidMeetingAddressPortal, technicalBidOpeningDate, periodOfWork,
      location, pincode, bidOpeningPlace, productCategory, natureOfWork,
      proposalsInvitedBy, dateOfOpeningFinancialProposals, modeOfSubmittingProposals,
      tenderWebsite, costOfRPFDocument, earnestMoneyDeposit, modeOfPayment,
      amount, bankName, performanceSecurity, methodOfSelection, objectionCharges,
      authorizedManager, authorizedPerson, stockItems, ...documents
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    const existingtenderID = await Tender.findOne({ tenderID });
   
    if (existingtenderID) {
       return res.status(400).json({
         success: false,
         message: `tender ID '${tenderID}' already exists.`,
       });
     }

    // Update tender
    const updatedTender = await Tender.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Tender updated successfully.",
      data: updatedTender
    });

  } catch (error) {
    console.error("Error updating tender:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the tender.",
      error: error.message
    });
  }
};

module.exports = { createTender, getAllTenders, getTenderById, getNewSrNumber, updateTender };
