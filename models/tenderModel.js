const mongoose = require('mongoose');

// Stock Item Schema
const stockItemSchema = new mongoose.Schema({
  stockName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: true },
  Rate: { type: Number, required: true },
}, { _id: false });

// Tender Schema
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
  proposalsInvitedBy: { type: String, required: true },
  dateOfOpeningFinancialProposals: { type: Date, required: true },
  modeOfSubmittingProposals: { type: String, required: true },
  tenderWebsite: { type: String, required: true },
  costOfRPFDocument: { type: Number, required: true },
  earnestMoneyDeposit: { type: Number, required: true },
  modeOfPayment: { type: String, required: true },
  amount: { type: Number, required: true },
  bankName: { type: String, required: true },
  performanceSecurity: { type: String, required: true },
  methodOfSelection: { type: String, required: true },
  objectionCharges: { type: Number, required: true },
  authorizedManager: { type: String, required: true },
  authorizedPerson: { type: String, required: true },
  stockItems: { type: [stockItemSchema], required: true },
  documents: [
    {
      fileName: { type: String, required: true },
      fileType: { type: String, required: true },
      filePath: { type: String, required: true },
      uploadDate: { type: Date, required: true },
    }
  ],
}, { timestamps: true });

const Tender = mongoose.model('Tender', tenderSchema);
module.exports = Tender;
