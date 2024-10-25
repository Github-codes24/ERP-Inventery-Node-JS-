const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    tenderName: { type: String, required: true },
    title: { type: String, required: true },
    issueDate: { type: Date, required: true },
    tenderFloatingDate: { type: Date, required: true },
    description: { type: String },
    bidderName: { type: String, required: true },
    documentDownloadStartDate: { type: Date, required: true },
    documentDownloadEndDate: { type: Date },
    bidSubmissionStartDate: { type: Date },
    bidSubmissionEndDate: { type: Date },
    bidValidity: { type: Number },
    prebidMeetingAddressPortal: { type: String },
    technicalBidOpeningDate: { type: Date },
    periodOfWork: { type: String },
    location: { type: String },
    pincode: { type: String },
    bidOpeningPlace: { type: String },
    productCategory: { type: String },
    natureOfWork: { type: String },
    proposalsInvitedBy: { type: String, required: true },
    dateOfOpeningFinancialProposals: { type: Date, required: true },
    modeOfSubmittingProposals: { type: String },
    tenderWebsite: { type: String, required: true },
    costOfRPFDocument: { type: Number },
    earnestMoneyDeposit: { type: Number },
    modeOfPayment: { type: String },
    amount: { type: Number },
    bankName: { type: String },
    performanceSecurity: { type: Number },
    methodOfSelection: { type: String },
    objectionCharges: { type: Number },
    stockName: { type: String },
    stockDescription: { type: String },
    quantity: { type: Number },
    unit: { type: Number },
    Rate: { type: Number },
    projectBidTotal: { type: Number },
    authorizedManager: { type: String, required: true },
    authorizedPerson: { type: String },
    documents: [
        {
            fileName: { type: String },
            fileType: { type: String },
            filePath: { type: String },
            uploadDate: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Tender', tenderSchema);
