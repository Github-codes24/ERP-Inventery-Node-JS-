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
  const {
    tenderID,
    tenderName,
    title,
    issueDate,
    tenderFloatingDate,
    description,
    bidderName,
    documentDownloadStartDate,
    documentDownloadEndDate,
    bidSubmissionStartDate,
    bidSubmissionEndDate,
    bidValidity,
    prebidMeetingAddressPortal,
    technicalBidOpeningDate,
    periodOfWork,
    location,
    pincode,
    bidOpeningPlace,
    productCategory,
    natureOfWork,
    proposalsInvitedBy,
    dateOfOpeningFinancialProposals,
    modeOfSubmittingProposals,
    tenderWebsite,
    costOfRPFDocument,
    earnestMoneyDeposit,
    modeOfPayment,
    amount,
    bankName,
    performanceSecurity,
    methodOfSelection,
    objectionCharges,
    authorizedManager,
    authorizedPerson
  } = req.body;

  const error = {}; // Object to hold error messages

  // Validate the required fields and add errors to the error object
  if (!tenderID) error.tenderID = "Tender ID is required.";
  if (!tenderName) error.tenderName = "Tender Name is required.";
  if (!title) error.title = "Title is required.";
  if (!issueDate) error.issueDate = "Issue Date is required.";
  if (!tenderFloatingDate) error.tenderFloatingDate = "Tender Floating Date is required.";
  if (!description) error.description = "Description is required.";
  if (!bidderName) error.bidderName = "Bidder Name is required.";
  if (!documentDownloadStartDate) error.documentDownloadStartDate = "Document Download Start Date is required.";
  if (!documentDownloadEndDate) error.documentDownloadEndDate = "Document Download End Date is required.";
  if (!bidSubmissionStartDate) error.bidSubmissionStartDate = "Bid Submission Start Date is required.";
  if (!bidSubmissionEndDate) error.bidSubmissionEndDate = "Bid Submission End Date is required.";
  if (!bidValidity) error.bidValidity = "Bid Validity is required.";
  if (!prebidMeetingAddressPortal) error.prebidMeetingAddressPortal = "Pre-bid Meeting Address/Portal is required.";
  if (!technicalBidOpeningDate) error.technicalBidOpeningDate = "Technical Bid Opening Date is required.";
  if (!periodOfWork) error.periodOfWork = "Period of Work is required.";
  if (!location) error.location = "Location is required.";
  if (!pincode) error.pincode = "Pincode is required.";
  if (!bidOpeningPlace) error.bidOpeningPlace = "Bid Opening Place is required.";
  if (!productCategory) error.productCategory = "Product Category is required.";
  if (!natureOfWork) error.natureOfWork = "Nature of Work is required.";
  if (!proposalsInvitedBy) error.proposalsInvitedBy = "Proposals Invited By is required.";
  if (!dateOfOpeningFinancialProposals) error.dateOfOpeningFinancialProposals = "Date of Opening Financial Proposals is required.";
  if (!modeOfSubmittingProposals) error.modeOfSubmittingProposals = "Mode of Submitting Proposals is required.";
  if (!tenderWebsite) error.tenderWebsite = "Tender Website is required.";
  if (!costOfRPFDocument) error.costOfRPFDocument = "Cost of RPF Document is required.";
  if (!earnestMoneyDeposit) error.earnestMoneyDeposit = "Earnest Money Deposit is required.";
  if (!modeOfPayment) error.modeOfPayment = "Mode of Payment is required.";
  if (!amount) error.amount = "Amount is required.";
  if (!bankName) error.bankName = "Bank Name is required.";
  if (!performanceSecurity) error.performanceSecurity = "Performance Security is required.";
  if (!methodOfSelection) error.methodOfSelection = "Method of Selection is required.";
  if (!objectionCharges) error.objectionCharges = "Objection Charges is required.";
  if (!authorizedManager) error.authorizedManager = "Authorized Manager is required.";
  if (!authorizedPerson) error.authorizedPerson = "Authorized Person is required.";

  // If there are validation errors, return them in the response
  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      message: "The following fields are missing or invalid:",
      error,
    });
  }

  // Process documents (if any)
  const documents = req.files
    ? Object.keys(req.files).map((key) => ({
        fileName: req.files[key][0].originalname,
        fileType: req.files[key][0].mimetype,
        filePath: req.files[key][0].path,
        uploadDate: new Date(),
      }))
    : [];

  // Process stock items (if any)
  const processedStockItems = Array.isArray(req.body.stockItems)
    ? req.body.stockItems.map(item => ({
        stockName: item.stockName,
        quantity: item.quantity,
        unit: item.unit,
        description: item.description,
        Rate: item.Rate,
        projectBidTotal: item.projectBidTotal,
      }))
    : [];

  try {
    const newTender = new Tender({
      tenderID,
      tenderName,
      title,
      issueDate,
      tenderFloatingDate,
      description,
      bidderName,
      documentDownloadStartDate,
      documentDownloadEndDate,
      bidSubmissionStartDate,
      bidSubmissionEndDate,
      bidValidity,
      prebidMeetingAddressPortal,
      technicalBidOpeningDate,
      periodOfWork,
      location,
      pincode,
      bidOpeningPlace,
      productCategory,
      natureOfWork,
      proposalsInvitedBy,
      dateOfOpeningFinancialProposals,
      modeOfSubmittingProposals,
      tenderWebsite,
      costOfRPFDocument,
      earnestMoneyDeposit,
      modeOfPayment,
      amount,
      bankName,
      performanceSecurity,
      methodOfSelection,
      objectionCharges,
      authorizedManager,
      authorizedPerson,
      stockItems: processedStockItems,
      documents,
    });

    const savedTender = await newTender.save();

    return res.status(201).json({
      success: true,
      message: "Tender created successfully.",
      data: savedTender,
    });
  } catch (error) {
    console.error("Error saving tender:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the tender.",
      error: error.message,
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

module.exports = { createTender, getAllTenders, getTenderById, getNewSrNumber };
