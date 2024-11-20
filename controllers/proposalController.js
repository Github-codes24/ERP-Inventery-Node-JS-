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

// // Get Proposals
// const getAllProposals = async (req, res) => {
//   try {
//     const { clientName } = req.query;
//     const proposal = await Proposal.find(req.query);
//     if (!proposal) {
//       return res.status(404).json({ message: "Proposal not found" });
//     }
//     if(proposal.isDeleted===false){
//       return res.status(200).json(proposal);
//     }
   
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const getAllProposals = async (req, res) => {
  try {
    const { clientName } = req.query;

    
    const filter = { isDeleted: false }; 

    if (clientName) {
      filter.clientName = clientName; 
    }

    const proposals = await Proposal.find(filter);

    if (proposals.length === 0) {
      return res.status(404).json({ message: "No proposals found" });
    }

    return res.status(200).json(proposals);
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

const getProposalById = async(req,res)=>{
  try{
    const {id} = req.params;
    const proposal = await Proposal.findById(id);
    if(!proposal){
      return res.status(404).json({message:"proposal not found"});
    }
    return res.status(200).json(proposal);
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
}


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
  getProposalById
};