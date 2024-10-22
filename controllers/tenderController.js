const Tender = require('../models/tenderModel'); 

// Get all tenders
const getTenders = async (req, res) => {
    try {
        const tenders = await Tender.find(); 
         return res.status(200).json(tenders); 
    } catch (error) {
         return res.status(500).json({ message: error.message }); 
    }
};

// Get a tender by ID
const getTenderById = async (req, res) => {
    const { id } = req.params;
    try {
        const tender = await Tender.findOne({ _id: id }); 
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' }); 
        }
        return res.status(200).json(tender); 
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
};

// Create a new tender
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
        natureOfWork
    } = req.body; 

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
            natureOfWork
        });

        await newTender.save(); 
        return res.status(201).json(newTender); 
    } catch (error) {
        console.error('Error creating tender:', error); 
        return res.status(500).json({ message: error.message }); 
    }
};

// Upload document
const uploadDocument = async (req, res) => {
    const document = req.file;

    if (!document) {
        return res.status(400).json({ message: 'Please upload a document' });
    }

    try {
        // Find the tender by tenderID 
        const tender = await Tender.findOne({ tenderID: req.params.id }); 
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' }); 
        }

        // Create document details
        const newDocument = {
            fileName: document.originalname,
            fileType: document.mimetype,
            filePath: document.path,
            uploadDate: new Date()
        };

        tender.documents.push(newDocument);
        await tender.save(); 

        return res.status(200).json({
            message: 'Document uploaded successfully',
            document: newDocument 
        });
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
};

module.exports = {
    createTender,
    getTenders,
    getTenderById,
    uploadDocument,
};

