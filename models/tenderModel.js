// models/tenderModel.js
const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    tenderID: String,
    tenderName: String,
    title: String,
    issueDate: Date,
    tenderFloatingDate: Date,
    description: String,
    bidderName: String,
    documentDownloadStartDate: Date,
    documentDownloadEndDate: Date,
    bidSubmissionStartDate: Date,
    bidSubmissionEndDate: Date,
    bidValidity: Date,
    prebidMeetingAddressPortal: String,
    technicalBidOpeningDate: Date,
    periodOfWork: String,
    location: String,
    pincode: String,
    bidOpeningPlace: String,
    productCategory: String,
    natureOfWork: String,
    proposalsInvitedBy: String,
    dateOfOpeningFinancialProposals: Date,
    modeOfSubmittingProposals: String,
    tenderWebsite: String,
    costOfRPFDocument: Number,
    earnestMoneyDeposit: Number,
    modeOfPayment: String,
    amount: Number,
    bankName: String,
    performanceSecurity: Number,
    methodOfSelection: String,
    objectionCharges: Number,
    authorizedManager: String,
    authorizedPerson: String,
    documents: [
        {
            fileName: String,
            fileType: String,
            filePath: String,
            uploadDate: Date,
        },
    ],
});

module.exports = mongoose.model('Tender', tenderSchema);
