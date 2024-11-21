const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema(
  {
    proposalID: {
      type: String,
    },
    proposalName: { type: String, default: "testing" },
    subject: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
    },
    clientName: {
      type: String,
    },
    clientContactInfo: {
      type: String,
    },
    responsibleDepartment: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
    proposalType: {
      type: String,
    },
    proposalDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    introduction: {
      type: String,
    },
    scopeOfWork: {
      type: String,
    },
    budgetEstimation: {
      type: String,
    },
    timeline: {
      type: String,
    },
    comments: {
      type: String,
    },
    deliverables: {
      type: String,
    },
    termsConditions: {
      type: String,
    },
    coveringLetter: {
      type: String,
    },
    specification: {
      type: String,
    },
    quotation: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", ProposalSchema);
