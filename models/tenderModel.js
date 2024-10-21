const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    filePath: { type: String, required: true }
});

const tenderSchema = new mongoose.Schema({
    tenderID: { type: String, required: true },
    tenderName: { type: String, required: true },
    title: { type: String, required: true },
    issueDate: { type: Date, required: true },
    tenderFloatingDate: { type: Date, required: true },
    description: { type: String, required: true },
    bidderName: { type: String, required: true },
    documentDownloadStartDate: { type: Date, required: true },
    documentDownloadEndDate: { type: Date, required: true },
    bidSubmissionStartDate: { type: Date, required: true },
    bidSubmissionEndDate: { type: Date, required: true },
    bidValidity: { type: String, required: true },
    prebidMeetingAddressPortal: { type: String, required: true },
    technicalBidOpeningDate: { type: Date, required: true },
    periodOfWork: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    bidOpeningPlace: { type: String, required: true },
    productCategory: { type: String, required: true },
    natureOfWork: { type: String, required: true },

    proposalsInvitedBy: { type: String },
    dateOfOpeningFinancialProposals: { type: Date },
    modeOfSubmittingProposals: { type: String },
    tenderWebsite: { type: String },
    costOfRPFDocument: { type: String },
    earnestMoneyDeposit: { type: String },
    modeOfPayment: { type: String },
    amount: { type: String },
    bankName: { type: String },
    performanceSecurity: { type: String },
    methodOfSelection: { type: String },
    objectionCharges: { type: String },

    authorizedManager: {
        name: String,
        objectionCharges: String
    },
    authorizedPerson: {
        name: String,
        objectionCharges: String
    },

    documents: [documentSchema]
});

module.exports = mongoose.model('Tender', tenderSchema);
