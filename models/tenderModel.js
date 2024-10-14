const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    filePath: { type: String, required: true }
});

const tenderSchema = new mongoose.Schema({
    tenderID: { type: String },
    tenderName: { type: String, required: true },
    title: { type: String, required: true },
    issueDate: { type: String, required: true },
    tenderFloatingDate: { type: String, required: true },
    description: { type: String, required: true },
    bidderName: { type: String, required: true },
    documentDownloadStartDate: { type: String, required: true },
    documentDownloadEndDate: { type: String, required: true },
    bidSubmissionStartDate: { type: String, required: true },
    bidSubmissionEndDate: { type: String, required: true },
    bidValidity: { type: String, required: true },
    prebidMeetingAddressPortal: { type: String, required: true },
    technicalBidOpeningDate: { type: String, required: true },
    periodOfWork: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    bidOpeningPlace: { type: String, required: true },
    productCategory: { type: String, required: true },
    natureOfWork: { type: String, required: true },
    documents: [documentSchema]  // Array to hold document details
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
