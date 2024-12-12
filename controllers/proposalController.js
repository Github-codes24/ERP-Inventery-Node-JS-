const Proposal = require("../models/proposalModel");
const Client = require("../models/clientModel");
 
const getNewSrNumber = async (req,res) => {
  try {
      const clients = await Proposal.find();
      const currentSrNo = clients.length + 1;
      return res.status(200).json({ success: true, srNo: currentSrNo });
  } catch (error) {
      console.error("Error getting new sr number:", error);
      return 1;
  }
}


// create a proposal
// const createProposal = async (req, res) => {
//   // console.log("Uploaded files:", req.files);
 
//   const {
//     subject,
//     clientName,
//     clientContactInfo,
//     responsibleDepartment,
//     assignedTo,
//     proposalType,
//     proposalDate,
//     dueDate,
//     status,
//     proposalName,
//     introduction,
//     scopeOfWork,
//     budgetEstimation,
//     timeline,
//     comments,
//     deliverables,
//     termsConditions,
//   } = req.body;
 
//   const { coveringLetter, specification, quotation } = req.files;
 
//   try {
//     const newProposal = new Proposal({
//       subject,
//       clientName,
//       clientContactInfo,
//       responsibleDepartment,
//       assignedTo,
//       proposalType,
//       proposalDate,
//       dueDate,
//       status,
//       proposalName,
//       introduction,
//       scopeOfWork,
//       budgetEstimation,
//       timeline,
//       comments,
//       deliverables,
//       termsConditions,
//       coveringLetter: coveringLetter ? coveringLetter[0].path : null,
//       specification: specification ? specification[0].path : null,
//       quotation: quotation ? quotation[0].path : null,
//     });
 
//     const savedProposal = await newProposal.save();
//     return res.status(201).json(savedProposal);
//   } catch (error) {
//     console.error("Error saving proposal:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

const createProposal = async (req, res) => {
  const {
    proposalID,
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

  const { coveringLetter, specification, quotation } = req.files || {};

  // Validate each field separately
  const missingFields = [];
  if (!subject) missingFields.push("subject");
  if (!clientName) missingFields.push("clientName");
  if (!clientContactInfo) missingFields.push("clientContactInfo");
  if (!responsibleDepartment) missingFields.push("responsibleDepartment");
  if (!assignedTo) missingFields.push("assignedTo");
  if (!proposalType) missingFields.push("proposalType");
  if (!proposalDate) missingFields.push("proposalDate");
  if (!dueDate) missingFields.push("dueDate");
//if (!status) missingFields.push("status");
  if (!proposalName) missingFields.push("proposalName");
  if (!introduction) missingFields.push("introduction");
  if (!scopeOfWork) missingFields.push("scopeOfWork");
  if (!budgetEstimation) missingFields.push("budgetEstimation");
  if (!timeline) missingFields.push("timeline");
  if (!comments) missingFields.push("comments");
  if (!deliverables) missingFields.push("deliverables");
  if (!termsConditions) missingFields.push("termsConditions");
  if (!coveringLetter) missingFields.push("coveringLetter");
  if (!specification) missingFields.push("specification");
  if (!quotation) missingFields.push("quotation");

  // If there are missing fields, return a detailed error message
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false ,
      message: "The following fields are missing:",
      missingFields,
    });
  }
  const existingproposalID = await  Proposal.findOne({ proposalID });
   
  if (existingproposalID) {
     return res.status(400).json({
       success: false,
       message: `proposal ID '${proposalID}' already exists.`,
     });
   }

  try {
    const newProposal = new Proposal({
      proposalID,
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
      coveringLetter: coveringLetter[0].path,
      specification: specification[0].path,
      quotation: quotation[0].path,
    });

    const savedProposal = await newProposal.save();
    return res.status(201).json({ success: true , message: "Proposal created successfully" ,savedProposal});
  } catch (error) {
    console.error("Error saving proposal:", error);
    return res.status(500).json({success: false , message: error.message });
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
    return res.status(500).json({success: false , message: error.message });
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
      success: true ,
      message: "Proposal updated successfully.",
      proposal: updatedProposal,
    });
  } catch (error) {
    return res.status(500).json({success: false , message: error.message });
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

    return res.status(200).json({success: true , message: "Proposal deleted successfully" });

  } catch (error) {
    console.error("Error deleting proposal:", error);
    return res.status(500).json({ 
      success: false ,
      message: "Error deleting proposal",
      error: error.message 
    });
  }
};


 
//check update api ,modify delete proposal api ,add get proposal by id
const getResponsibleDepartments = (req, res) => {
  const responsibleDepartments = [
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
  ];

  try {
    // Respond with the list of responsible departments
    return res.status(200).json({
      message: "Responsible departments retrieved successfully.",
      responsibleDepartments,
    });
  } catch (error) {
    console.error("Error fetching responsible departments:", error);
    return res.status(500).json({
      message: "Error retrieving responsible departments.",
      error: error.message,
    });
  }
}; 

const getAssignedTo = (req, res) => {
  // Define predefined roles for 'assignedTo'
  const assignedTo = [
    "Project Manager",
    "Sales Representative",
    "Lead Developer",
    "Marketing Specialist",
  ];

  try {
    // Respond with the list of roles
    return res.status(200).json({
      message: "Assigned to roles retrieved successfully.",
      assignedTo,
    });
  } catch (error) {
    console.error("Error fetching assigned to roles:", error);
    return res.status(500).json({
      message: "Error retrieving assigned to roles.",
      error: error.message,
    });
  }
};

const getProposalType = (req, res) => {
  // Define only 4 random proposal types
  const proposalTypes = [
    "Business Proposal",
    "Project Proposal",
    "Investment Proposal",
    "Marketing Proposal",
  ];

  try {
    // Respond with the list of proposal types
    return res.status(200).json({
      message: "Proposal types retrieved successfully.",
      proposalTypes,
    });
  } catch (error) {
    console.error("Error fetching proposal types:", error);
    return res.status(500).json({
      message: "Error retrieving proposal types.",
      error: error.message,
    });
  }
};
const getClientNames = async (req, res) => {
  // Define a list of 5 client names
  const clientNames = await Client.find().select("dealerName");


  try {
    // Respond with the list of client names
    return res.status(200).json({
      message: "Client names retrieved successfully.",
      clientNames,
    });
  } catch (error) {
    console.error("Error retrieving client names:", error);
    return res.status(500).json({
      message: "Error retrieving client names.",
      error: error.message,
    });
  }
};


module.exports = {
  createProposal,
  getAllProposals,
  getClientNames,
  getProposalType,
  getResponsibleDepartments,
  getAssignedTo,
  updateProposal,
  deleteProposal,
  getProposalById,
  getNewSrNumber
};