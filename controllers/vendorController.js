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

    
    const error = {};  
    if (!vendorId) error.vendorId = "Vendor ID is required.";
    if (!vendorName) error.vendorName = "Vendor Name is required.";
    if (!contactNumber) error.contactNumber = "Contact Number is required.";
    if (!alternateNumber) error.alternateNumber = "Alternate Number is required.";
    if (!contactEmail) error.contactEmail = "Contact Email is required.";
    if (!alternateEmail) error.alternateEmail = "Alternate Email is required.";
    if (!productOrService) error.productOrService = "Product or Service is required.";
    if (!category) error.category = "Category is required.";
    if (!productManufacture) error.productManufacture = "Product Manufacture is required.";
    if (!additionalInfo) error.additionalInfo = "Additional Info is required.";
    if (!bankName) error.bankName = "Bank Name is required.";
    if (!branchName) error.branchName = "Branch Name is required.";
    if (!ifscCode) error.ifscCode = "IFSC Code is required.";
    if (!bankingName) error.bankingName = "Banking Name is required.";
    if (!date) error.date = "Date is required.";

    // If any required fields are missing, return an error response
    if (Object.keys(error).length > 0) {
      return res.status(400).json({
        message: "The following fields are missing or invalid:",
        error
      });
    }

    // Create the new vendor document
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
      date
    });

    // Save the vendor to the database
    await newVendor.save();

    // Return success response with the created vendor
    return res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor: newVendor
    });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({
      success: false,
      message: "Error creating vendor",
      error: error.message
    });
  }
};





const findVendor = async (req, res) => {
  try {
    
    const { vendorName, page = 1, limit = 10 } = req.query;

    // Initialize the filter object
    const filter = {};

    // Add filter condition if venderName is provided
    if (vendorName) {
      filter.vendorName = { $regex: vendorName, $options: 'i' }; // Case-insensitive search
    }

    // Parse page and limit as integers
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch total count of vendors based on the filter
    const totalCount = await Vendor.countDocuments(filter);

    // Fetch vendors with pagination based on the filter
    const vendors = await Vendor.find(filter).skip(skip).limit(itemsPerPage).sort({ createdAt: -1 });

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


const getNewSrNumber = async (req,res) => {
  try {
      const clients = await Vendor.find();
      const currentSrNo = clients.length + 1;
      return res.status(200).json({ success: true, srNo: currentSrNo });
  } catch (error) {
      console.error("Error getting new sr number:", error);
      return 1;
  }
}



module.exports = {
  createVendor,
  findVendor,
  updateVendor,
  getVendorById,
  getNewSrNumber
};