const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  proposalID: String,
  subject: String,
  clientName: String,
  clientContactInfo: String,
  responsibleDepartment: String,
  assignedTo: String,
  proposalType: String,
  proposalDate: Date,
  dueDate: Date,
  introduction: String,
  scopeOfWork: String,
  budgetEstimation: Number,
  timeline: String,
  comments: [String],
  deliverables: String,
  TermsConditions: String,
  coveringLetter: String,
  specification: String,
  quotation: String,
}, { timestamps: true });

module.exports = mongoose.model("Proposal", ProposalSchema);
