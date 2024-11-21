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

 
// const getAllProposals = async (req, res) => {
//   try {
//     const { clientName } = req.query;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
 
//     const filter = { isDeleted: false };
 
//     if (clientName) {
//       filter.clientName = clientName;
//     }
//     // const proposals = await Proposal.find(filter).select(
//     //   " proposalID proposalName clientName proposalDate status budgetEstimation "
//     // );
   
//    // const totalCount = proposals.length;
 
//    const totalCount = await Proposal.countDocuments(filter);  
 
//     const totalPages = Math.ceil(totalCount / limit);
//     const proposals = await Proposal.find(filter).select(
//       " proposalID proposalName clientName proposalDate status budgetEstimation "
//     ).skip(skip)
//     .limit(limit);
 
 
//     if (!proposals || proposals.length === 0) {
//       return res.status(404).json({ message: "No proposals found" });
//     }
 
//     return res.status(200).json({
//       success: true,
//       message: "Retrieved Proposal  successfully",
 
//       data: {
//         pagination: {
//           currentPage: page,
//           totalPages,
//           hasNextPage: page < totalPages,
//           hasPrevPage: page > 1
//         },
 
//     }});
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
 
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
      .limit(itemsPerPage);
 
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
    const deletedProposal = await Proposal.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
    if (!deletedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    return res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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