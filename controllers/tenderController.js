const Tender = require('../models/tenderModel');

const createTender = async (req, res) => {
    try {
        const {
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
        } = req.body;

        const documents = req.files ? Object.keys(req.files).map((key) => {
            return {
                fileName: req.files[key][0].originalname,
                fileType: req.files[key][0].mimetype,
                filePath: req.files[key][0].path,
                uploadDate: new Date(),
            };
        }) : [];

        const newTender = new Tender({
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
            documents,
        });

        const savedTender = await newTender.save();

        return res.status(201).json({
            success: true,
            message: "Tender created successfully.",
            data: {
                tenderID: savedTender._id, 
                tenderName: savedTender.tenderName,
                title: savedTender.title,
                issueDate: savedTender.issueDate,
                tenderFloatingDate: savedTender.tenderFloatingDate,
                description: savedTender.description,
                bidderName: savedTender.bidderName,
                documentDownloadStartDate: savedTender.documentDownloadStartDate,
                documentDownloadEndDate: savedTender.documentDownloadEndDate,
                bidSubmissionStartDate: savedTender.bidSubmissionStartDate,
                bidSubmissionEndDate: savedTender.bidSubmissionEndDate,
                bidValidity: savedTender.bidValidity,
                prebidMeetingAddressPortal: savedTender.prebidMeetingAddressPortal,
                technicalBidOpeningDate: savedTender.technicalBidOpeningDate,
                periodOfWork: savedTender.periodOfWork,
                location: savedTender.location,
                pincode: savedTender.pincode,
                bidOpeningPlace: savedTender.bidOpeningPlace,
                productCategory: savedTender.productCategory,
                natureOfWork: savedTender.natureOfWork,
                proposalsInvitedBy: savedTender.proposalsInvitedBy,
                dateOfOpeningFinancialProposals: savedTender.dateOfOpeningFinancialProposals,
                modeOfSubmittingProposals: savedTender.modeOfSubmittingProposals,
                tenderWebsite: savedTender.tenderWebsite,
                costOfRPFDocument: savedTender.costOfRPFDocument,
                earnestMoneyDeposit: savedTender.earnestMoneyDeposit,
                modeOfPayment: savedTender.modeOfPayment,
                amount: savedTender.amount,
                bankName: savedTender.bankName,
                performanceSecurity: savedTender.performanceSecurity,
                methodOfSelection: savedTender.methodOfSelection,
                objectionCharges: savedTender.objectionCharges,
                authorizedManager: savedTender.authorizedManager,
                authorizedPerson: savedTender.authorizedPerson,
                documents: savedTender.documents,
            }
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
const getTenders = async (req, res) => {
    try {
        const tenders = await Tender.find(); 
        return res.status(200).json({
            success: true,
            data: tenders,
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

//modules expoerted 

module.exports = { createTender, getTenders, getTenderById };