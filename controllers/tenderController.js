const Tender = require('../models/tenderModel');

const createTender = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

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

        const processedStockItems = Array.isArray(req.body.stockItems)
            ? req.body.stockItems.map(item => ({
                  stockName: item.stockName,
                  quantity: item.quantity,
                  unit: item.unit,
                  description: item.description,
                  Rate: item.Rate,
                  projectBidTotal: item.projectBidTotal
              }))
            : [];

        // console.log("Extracted Stock Items:", processedStockItems);

        const documents = req.files
            ? Object.keys(req.files).map((key) => ({
                  fileName: req.files[key][0].originalname,
                  fileType: req.files[key][0].mimetype,
                  filePath: req.files[key][0].path,
                  uploadDate: new Date(),
              }))
            : [];

        // console.log("Extracted Documents:", documents);

        const newTender = new Tender({
            tenderId,
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
            documents   
        });

        const savedTender = await newTender.save();

        return res.status(201).json({
            success: true,
            message: "Tender created successfully.",
            data: savedTender,
        });
    } catch (error) {
        console.error(error);
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
        const { page = 1, limit = 10, ...query } = req.query;
         
        // Parse page and limit as integers
        const currentPage = parseInt(page, 10);
        const itemsPerPage = parseInt(limit, 10);
        const skip = (currentPage - 1) * itemsPerPage;

        // Fetch total count of tenders
        const totalCount = await Tender.countDocuments(query);

        // Fetch tenders with pagination
        const tenders = await Tender.find(query)
            .select("tenderID title issueDate authorizedPerson")
            .skip(skip)
            .limit(itemsPerPage);

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

module.exports = { createTender, getAllTenders, getTenderById };
