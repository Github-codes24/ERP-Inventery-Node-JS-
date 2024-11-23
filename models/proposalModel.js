const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema(
  {
    proposalID: {
      type: String,
     // required: true,
    },
    proposalName: { 
      type: String, 
      required: true, 
      default: "testing" 
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientContactInfo: {
      type: String,
      required: true,
    },
    responsibleDepartment: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    proposalType: {
      type: String,
      required: true,
    },
    proposalDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    scopeOfWork: {
      type: String,
      required: true,
    },
    budgetEstimation: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    deliverables: {
      type: String,
      required: true,
    },
    termsConditions: {
      type: String,
      required: true,
    },
    coveringLetter: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    quotation: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", ProposalSchema);
