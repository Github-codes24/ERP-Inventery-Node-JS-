//get warehouse
const warehouseModel = require("../models/warehouse.model")
const PurchaseOrder = require('../models/purchaseOrder');

const createWarehouse = async (req, res) => {
  try {
    // Extract warehouse data from request body
    const {
      warehouseID,
      warehouseName,
      contactPerson1Name,
      contactPerson2Name,
      contactNumber,
      officialEmail,
      alternateNumber,
      personalEmail,
      location,
      postalAddress,
      pincode,
      type,
      storedMaterials,
    } = req.body;

    // Initialize error object for validation
    const errors = {};

    // Validate required fields
    if (!warehouseID) errors.warehouseID = "Warehouse ID is required.";
    if (!warehouseName) errors.warehouseName = "Warehouse name is required.";
    if (!contactPerson1Name) errors.contactPerson1Name = "Contact person 1 name is required.";
    if (!contactPerson2Name) errors.contactPerson2Name = "Contact person 2 name is required.";
    if (!contactNumber) errors.contactNumber = "Contact number is required.";
    if (!officialEmail) errors.officialEmail = "Official email is required.";
    if (!alternateNumber) errors.alternateNumber = "Alternate number is required.";
    if (!personalEmail) errors.personalEmail = "Personal email is required.";
    if (!location) errors.location = "Location is required.";
    if (!postalAddress) errors.postalAddress = "Postal address is required.";
    if (!pincode) errors.pincode = "Pincode is required.";
    if (!type) errors.type = "Type is required.";
    if (!storedMaterials || !Array.isArray(storedMaterials) || storedMaterials.length === 0) {
      errors.storedMaterials = "At least one stored material is required.";
    } else {
      // Validate each material object in the storedMaterials array
      storedMaterials.forEach((material, index) => {
        if (!material.storedMaterialName) {
          errors[`storedMaterials[${index}].storedMaterialName`] = `Stored material name is required at ${index} index.`;
        }
        if (!material.quantity || typeof material.quantity !== "number") {
          errors[`storedMaterials[${index}].quantity`] = `Quantity is required and must be a number at ${index} index.`;
        }
      });
    }

    // If any required fields are missing, return an error response
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors found.",
        errors,
      });
    }

    // Check if the warehouse ID already exists in the database
    const existingWarehouse = await warehouseModel.findOne({ warehouseID });
    if (existingWarehouse) {
      return res.status(400).json({
        success: false,
        message: `Warehouse with ID ${warehouseID} already exists.`,
      });
    }

    // Create a new warehouse record
    const newWarehouse = new warehouseModel({
      warehouseID,
      warehouseName,
      contactPerson1Name,
      contactPerson2Name,
      contactNumber,
      officialEmail,
      alternateNumber,
      personalEmail,
      location,
      postalAddress,
      pincode,
      type,
      storedMaterials,
    });

    // Save the new warehouse to the database
    const savedWarehouse = await newWarehouse.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Warehouse created successfully",
      warehouse: savedWarehouse,
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Error creating warehouse",
      error: error.message,
    });
  }
};

const getAllWareHouses = async (req, res) => {
    try {
        return res.status(200).json({
        success: true,
        "wareHouses": [
            "Warehouse 1",
            "Warehouse 2",
            "Warehouse 3",
            "Warehouse 4",
            "Warehouse 5"
        ]
        });
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
};

// Dropdown API for warehouse types
const getWarehouseTypes = (req, res) => {
  try {
    // Predefined warehouse types
    const warehouseTypes = [
      "Cold Storage",
      "Dry Storage",
      "Automated Storage",
      "Hazardous Materials",
      "Distribution Center",
    ];

    // Respond with the list
    return res.status(200).json({
      success: true,
      message: "Warehouse types retrieved successfully.",
      data: warehouseTypes,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Error retrieving warehouse types.",
      error: error.message,
    });
  }
};

const getNewIDNumber = async (req,res) => {
  try {
      const wareHouses = await warehouseModel.find();
      const wareHousesID = wareHouses.length + 1;
      return res.status(200).json({ success: true, ID: wareHousesID });
  } catch (error) {
      console.error("Error getting new sr number:", error);
      return 1;
  }
}

const getWarehousePercentages = async (req, res) => {
  try {
    // Get all warehouses from the database
    const warehouses = await warehouseModel.find();

    // Calculate the total quantity of all warehouses
    const totalQuantity = warehouses.reduce((total, warehouse) => {
      return total + warehouse.storedMaterials.reduce((sum, material) => sum + material.quantity, 0);
    }, 0);

    // Initialize an array to store the warehouse percentages
    const warehousePercentages = warehouses.map((warehouse) => {
      const warehouseQuantity = warehouse.storedMaterials.reduce((sum, material) => sum + material.quantity, 0);
      const percentage = (warehouseQuantity / totalQuantity) * 100;
      return {
        warehouseID: warehouse.warehouseID,
        warehouseName: warehouse.warehouseName,
        percentage: percentage.toFixed(2) // Round to 2 decimal places
      };
    });

    // Return the calculated percentages
    return res.status(200).json({
      success: true,
      data: warehousePercentages
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Error retrieving warehouse percentages.",
      error: error.message,
    });
  }
};

const getOrdersAndShipments = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch paginated data
    const ordersandshipments = await PurchaseOrder.find({})
      .select("poOrderNo poDate orderDetails.quantity purchaseForm.vendorName status")
      .skip(skip)
      .limit(itemsPerPage);

    // Transform orders into the desired structure
    const transformedOrders = ordersandshipments.map(order => {
      const totalQuantity = order.orderDetails.reduce((sum, detail) => sum + detail.quantity, 0);
      return {
        totalItems: totalQuantity,
        orderId: order.poOrderNo,
        _id: order._id,
        customerName: order.purchaseForm.vendorName,
        orderId: order.poOrderNo,
        orderDate: order.poDate,
        status: order.status, 
      };
    });
       const ordersandshipmentlength=ordersandshipments.length;
    // Calculate pagination data
    const totalOrders = await PurchaseOrder.countDocuments({});
    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    res.status(200).json({
      success: true,
      data: {
        ordersandshipments: transformedOrders,
        pagination: {
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
          totalCount: transformedOrders.length,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching orders and shipments:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createWarehouse,
  getAllWareHouses,
  getWarehouseTypes,
  getNewIDNumber,
  getWarehousePercentages,
  getOrdersAndShipments,
}