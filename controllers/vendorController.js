const Vendor = require("../models/Vendor.js");

const create = async (req, res) => {
  try {
    const {
      vendorId,
      vendorName,
      contactName,
      alternateName,
      contactEmail,
      alternateEmail,
      productService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
    } = req.body;

    // Create a new vendor instance
    const newVendor = new Vendor({
      vendorId,
      vendorName,
      contactName,
      alternateName,
      contactEmail,
      alternateEmail,
      productService,
      category,
      productManufacture,
      additionalInfo,
      bankName,
      branchName,
      ifscCode,
      bankingName,
    });

    // Save the vendor to the database
    await newVendor.save();

    res
      .status(201)
      .json({ message: "Vendor created successfully", vendor: newVendor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating vendor", error: error.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving vendors", error: error.message });
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
        .json({ message: "No vendor found with the provided criteria" });
    }

    res.status(200).json(vendors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding vendor", error: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const { id } = req.params; // Get _id from request params
    const updateData = req.body; // Get update data from request body

    // Find the vendor using the default MongoDB _id
    const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    // Check if vendor was found and updated
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res
      .status(200)
      .json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating vendor", error: error.message });
  }
};

module.exports = {
  create,
  getAllVendors,
  findVendor,
  updateVendor,
};
