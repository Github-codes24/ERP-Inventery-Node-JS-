const Proposal = require("../models/proposalModel");

// create a proposal
const createProposal = async (req, res) => {
    console.log('Uploaded files:', req.files);

    try {
        const newProposal = new Proposal({
            subject: req.body.subject,
            clientName: req.body.clientName,
            clientContactInfo: req.body.clientContactInfo,
            responsibleDepartment: req.body.responsibleDepartment,
            assignedTo: req.body.assignedTo,
            proposalType: req.body.proposalType,
            proposalDate: req.body.proposalDate,
            dueDate: req.body.dueDate,
            introduction: req.body.introduction,
            scopeOfWork: req.body.scopeOfWork,
            budgetEstimation: req.body.budgetEstimation,
            timeline: req.body.timeline,
            comments: req.body.comments,
            deliverables: req.body.deliverables,
            TermsConditions: req.body.TermsConditions,
            coveringLetter: req.files.coveringLetter ? req.files.coveringLetter[0].path : null,
            specification: req.files.specification ? req.files.specification[0].path : null,
            quotation: req.files.quotation ? req.files.quotation[0].path : null,
        });

        const savedProposal = await newProposal.save();
        res.status(201).json(savedProposal);
    } catch (error) {
        console.error('Error saving proposal:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Proposals
const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Proposal by Name
const getProposalByName = async (req, res) => {
    try {
      const proposal = await Proposal.findOne({ clientName: req.params.name });
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      res.status(200).json(proposal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Update Proposal by ID
const updateProposal = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      subject: req.body.subject,
      clientName: req.body.clientName,
      clientContactInfo: req.body.clientContactInfo,
      responsibleDepartment: req.body.responsibleDepartment,
      assignedTo: req.body.assignedTo,
      proposalType: req.body.proposalType,
      proposalDate: req.body.proposalDate,
      dueDate: req.body.dueDate,
      introduction: req.body.introduction,
      scopeOfWork: req.body.scopeOfWork,
      budgetEstimation: req.body.budgetEstimation,
      timeline: req.body.timeline,
      comments: req.body.comments,
      deliverables: req.body.deliverables,
      TermsConditions: req.body.TermsConditions,

    };

    if (req.files) {
      if (req.files.coveringLetter) updatedData.coveringLetter = req.files.coveringLetter[0].path;
      if (req.files.specification) updatedData.specification = req.files.specification[0].path;
      if (req.files.quotation) updatedData.quotation = req.files.quotation[0].path;
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // res.status(200).json(updatedProposal);
    res.status(200).json({
        message: "Proposal updated successfully.",
        proposal: updatedProposal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Proposal by ID
const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProposal = await Proposal.findByIdAndDelete(id);
    if (!deletedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProposal,
  getAllProposals,
  getProposalByName,
  updateProposal,
  deleteProposal,
};
