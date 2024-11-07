const Proposal = require("../models/proposalModel");

// create a proposal
const createProposal = async (req, res) => {
  console.log('Uploaded files:', req.files);

  const {
      subject,
      clientName,
      clientContactInfo,
      responsibleDepartment,
      assignedTo,
      proposalType,
      proposalDate,
      dueDate,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      TermsConditions
  } = req.body;

  const {
      coveringLetter,
      specification,
      quotation
  } = req.files;

  try {
      const newProposal = new Proposal({
          subject,
          clientName,
          clientContactInfo,
          responsibleDepartment,
          assignedTo,
          proposalType,
          proposalDate,
          dueDate,
          introduction,
          scopeOfWork,
          budgetEstimation,
          timeline,
          comments,
          deliverables,
          TermsConditions,
          coveringLetter: coveringLetter ? coveringLetter[0].path : null,
          specification: specification ? specification[0].path : null,
          quotation: quotation ? quotation[0].path : null,
      });

      const savedProposal = await newProposal.save();
       return res.status(201).json(savedProposal);
  } catch (error) {
      console.error('Error saving proposal:', error);
     return res.status(500).json({ message: error.message });
  }
};


// Get All Proposals
const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find();
     return res.status(200).json(proposals);
  } catch (error) {
    return  res.status(500).json({ message: error.message });
  }
};

// Get Proposal by Name
const getProposalByName = async (req, res) => {
    try {
      const proposal = await Proposal.findOne({ clientName: req.params.name });
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
       return res.status(200).json(proposal);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
  };
  

// Update Proposal by ID
const updateProposal = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      clientName,
      clientContactInfo,
      responsibleDepartment,
      assignedTo,
      proposalType,
      proposalDate,
      dueDate,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      TermsConditions
    } = req.body;

    const updatedData = {
      subject,
      clientName,
      clientContactInfo,
      responsibleDepartment,
      assignedTo,
      proposalType,
      proposalDate,
      dueDate,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      TermsConditions
    };

    const { coveringLetter, specification, quotation } = req.files || {};

    if (req.files) {
      if (coveringLetter) updatedData.coveringLetter = coveringLetter[0].path;
      if (specification) updatedData.specification = specification[0].path;
      if (quotation) updatedData.quotation = quotation[0].path;
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

     return res.status(200).json({
      message: "Proposal updated successfully.",
      proposal: updatedProposal,
    });
  } catch (error) {
     return res.status(500).json({ message: error.message });
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
    return res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProposal,
  getAllProposals,
  getProposalByName,
  updateProposal,
  deleteProposal,
};
