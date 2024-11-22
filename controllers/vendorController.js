const Vendor = require("../models/VendorModel.js");

const createVendor = async (req, res) => {
  try {
    const {
      vendorId,
      vendorName,
      contactNumber, 
      alternateNumber, 
      contactEmail,
      alternateEmail,
      productOrService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
      date
    } = req.body;

    const newVendor = new Vendor({
      vendorId,
      vendorName,
      contactNumber,
      alternateNumber,
      contactEmail,
      alternateEmail,
      productOrService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
      date,
    });
     await newVendor.save();
     return res
      .status(201)
      .json({success:true , message: "Vendor created successfully", vendor: newVendor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating vendor", error: error.message });
  }
};



const findVendor = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query;

    // Parse page and limit as integers
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch total count of vendors based on query
    const totalCount = await Vendor.countDocuments(query);

    // Fetch vendors with pagination
    const vendors = await Vendor.find(query).skip(skip).limit(itemsPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Handle case when no vendors are found
    if (vendors.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No vendors found with the provided criteria.",
      });
    }

    // Respond with vendors and pagination data
    return res.status(200).json({
      success: true,
      message: "Vendors retrieved successfully.",
      data: {
        vendors,
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching vendors.",
      error: error.message,
    });
  }
};


const getVendorById = async (req, res) => {
  try {
    const { id } = req.params; // Get _id from request params
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res.status(200).json({ status: true, vendor });
  } catch (error) {
     return res
      .status(500)
      .json({ message: "Error finding vendor", error: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const { id } = req.params; 
    const {
      vendorId,
      vendorName,
      contactNumber,
      alternateNumber,
      contactEmail,
      alternateEmail,
      productOrService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
    } = req.body;

    
    const updateData = {
      vendorId,
      vendorName,
      contactNumber,
      alternateNumber,
      contactEmail,
      alternateEmail,
      productOrService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
    };

    const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, {
      new: true 
    });
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res
      .status(200)
      .json({ success:true , message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating vendor", error: error.message });
  }
};
//add sucess messages pending//

module.exports = {
  createVendor,
  findVendor,
  updateVendor,
  getVendorById,
};