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
    // Retrieve query parameters from the request
    const query = req.query;

    // Find vendors based on query parameters
    const vendors = await Vendor.find(query);

    if (vendors.length === 0) {
      return res
        .status(404)
        .json({success:true , message: "No vendor found with the provided criteria" });
    }

     return res.status(200).json(vendors);
  } catch (error) {
     return res
      .status(500)
      .json({ message: "Error finding vendor", error: error.message });
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