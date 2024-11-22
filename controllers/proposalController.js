const Proposal = require("../models/proposalModel");
 
// create a proposal
const createProposal = async (req, res) => {
  // console.log("Uploaded files:", req.files);
 
  const {
    subject,
    clientName,
    clientContactInfo,
    responsibleDepartment,
    assignedTo,
    proposalType,
    proposalDate,
    dueDate,
    status,
    proposalName,
    introduction,
    scopeOfWork,
    budgetEstimation,
    timeline,
    comments,
    deliverables,
    termsConditions,
  } = req.body;
 
  const { coveringLetter, specification, quotation } = req.files;
 
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
      status,
      proposalName,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      termsConditions,
      coveringLetter: coveringLetter ? coveringLetter[0].path : null,
      specification: specification ? specification[0].path : null,
      quotation: quotation ? quotation[0].path : null,
    });
 
    const savedProposal = await newProposal.save();
    return res.status(201).json(savedProposal);
  } catch (error) {
    console.error("Error saving proposal:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const { proposalName, clientName, page = 1, limit = 10 } = req.query;
 
    // Parse page and limit as integers
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);
 
    const skip = (currentPage - 1) * itemsPerPage;
 
    // Build the filter object
    const filter = { isDeleted: false };
    if (clientName) {
      filter.clientName = clientName;
    }
    if (proposalName) {
      filter.proposalName = proposalName;
    }
 
    // Get total count of matching documents
    const totalCount = await Proposal.countDocuments(filter);
 
    // Fetch proposals with pagination
    const proposals = await Proposal.find(filter)
      .select("proposalID proposalName clientName proposalDate status budgetEstimation")
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });
 
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);
 
    if (!proposals || proposals.length === 0) {
      return res.status(404).json({ message: "No proposals found" });
    }
 
    return res.status(200).json({
      success: true,
      message: "Retrieved proposals successfully",
      data: {
        proposals,
        pagination: {
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
          totalCount,
        },
      },
    });
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
      proposalName,
      dueDate,
      status,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      termsConditions,
    } = req.body;
 
    const updatedData = {
      subject,
      clientName,
      clientContactInfo,
      responsibleDepartment,
      assignedTo,
      proposalType,
      proposalDate,
      proposalName,
      dueDate,
      status,
      introduction,
      scopeOfWork,
      budgetEstimation,
      timeline,
      comments,
      deliverables,
      termsConditions,
    };
 
    const { coveringLetter, specification, quotation } = req.files || {};
 
    if (req.files) {
      if (coveringLetter) updatedData.coveringLetter = coveringLetter[0].path;
      if (specification) updatedData.specification = specification[0].path;
      if (quotation) updatedData.quotation = quotation[0].path;
    }
 
    const updatedProposal = await Proposal.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
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
 
const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(400).json({ message: "proposal not found" });
    }
    return res.status(200).json(proposal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 
// Delete Proposal by ID
const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find proposal 
    const proposal = await Proposal.findById(id);

    // Check if proposal exists
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Check if already deleted
    if (proposal.isDeleted) {
      return res.status(400).json({ message: "Proposal already deleted" });
    }

    // Update deletion status
    proposal.isDeleted = true;
    await proposal.save();

    return res.status(200).json({ message: "Proposal deleted successfully" });

  } catch (error) {
    console.error("Error deleting proposal:", error);
    return res.status(500).json({ 
      message: "Error deleting proposal",
      error: error.message 
    });
  }
};
 
//check update api ,modify delete proposal api ,add get proposal by id
 
module.exports = {
  createProposal,
  getAllProposals,
 
  updateProposal,
  deleteProposal,
  getProposalById,
};