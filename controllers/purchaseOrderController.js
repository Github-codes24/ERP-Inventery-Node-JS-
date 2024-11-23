const PurchaseOrder = require('../models/purchaseOrder');


// const createPurchaseOrder = async (req, res) => {
//   try {
//     const {
//       poOrderNo,
//       poDate,
//       shipAndBillToAddress,
//       purchaseForm,
//       orderDetails,
//       subTotal,
//       shippingHandling,
//       taxes,
//       netAmount,
//       expiryTerms,
//       paymentTerms,
//       deliveryTerms,
//       returnPolicy,
//       name,
//       designation,
//       email,
//       contact,
//     } = req.body;

//     // Validate required fields
//     if (
//       !poOrderNo ||
//       !poDate ||
//       !shipAndBillToAddress ||
//       !purchaseForm ||
//       !orderDetails ||
//       !subTotal ||
//       !shippingHandling ||
//       !taxes ||
//       !netAmount ||
//       !expiryTerms ||
//       !paymentTerms ||
//       !deliveryTerms ||
//       !returnPolicy ||
//       !name ||
//       !designation ||
//       !email ||
//       !contact
//     ) {
//       return res.status(400).json({
//         message: "All fields are required.",
//       });
//     }

//     const newPurchaseOrder = new PurchaseOrder({
//       poOrderNo,
//       poDate,
//       shipAndBillToAddress,
//       purchaseForm,
//       orderDetails,
//       subTotal,
//       shippingHandling,
//       taxes,
//       netAmount,
//       expiryTerms,
//       paymentTerms,
//       deliveryTerms,
//       returnPolicy,
//       name,
//       designation,
//       email,
//       contact,
//     });

//     // Save to database
//     await newPurchaseOrder.save();

//     return res.status(201).json({
//       message: "Purchase Order created successfully!",
//       purchaseOrder: newPurchaseOrder,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error creating purchase order",
//       error: error.message,
//     });
//   }
// };

const createPurchaseOrder = async (req, res) => {
  try {
    const {
      poOrderNo,
      poDate,
      shipAndBillToAddress,
      purchaseForm,
      orderDetails,
      subTotal,
      shippingHandling,
      taxes,
      netAmount,
      expiryTerms,
      paymentTerms,
      deliveryTerms,
      returnPolicy,
      name,
      designation,
      email,
      contact,
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!poOrderNo) missingFields.push("poOrderNo");
    if (!poDate) missingFields.push("poDate");
    if (!shipAndBillToAddress) missingFields.push("shipAndBillToAddress");
    if (!purchaseForm) missingFields.push("purchaseForm");
    if (!orderDetails) missingFields.push("orderDetails");
    if (!subTotal) missingFields.push("subTotal");
    if (!shippingHandling) missingFields.push("shippingHandling");
    if (!taxes) missingFields.push("taxes");
    if (!netAmount) missingFields.push("netAmount");
    if (!expiryTerms) missingFields.push("expiryTerms");
    if (!paymentTerms) missingFields.push("paymentTerms");
    if (!deliveryTerms) missingFields.push("deliveryTerms");
    if (!returnPolicy) missingFields.push("returnPolicy");
    if (!name) missingFields.push("name");
    if (!designation) missingFields.push("designation");
    if (!email) missingFields.push("email");
    if (!contact) missingFields.push("contact");

    // If any fields are missing, return a detailed error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "The following fields are required:",
        missingFields,
      });
    }

    // Create a new purchase order
    const newPurchaseOrder = new PurchaseOrder({
      poOrderNo,
      poDate,
      shipAndBillToAddress,
      purchaseForm,
      orderDetails,
      subTotal,
      shippingHandling,
      taxes,
      netAmount,
      expiryTerms,
      paymentTerms,
      deliveryTerms,
      returnPolicy,
      name,
      designation,
      email,
      contact,
    });

    // Save to database
    const savedPurchaseOrder = await newPurchaseOrder.save();

    // Send success response
    return res.status(201).json({
      message: "Purchase Order created successfully!",
      purchaseOrder: savedPurchaseOrder,
    });
  } catch (error) {
    // Send error response
    console.error("Error creating purchase order:", error);
    return res.status(500).json({
      message: "Error creating purchase order",
      error: error.message,
    });
  }
};


const getAllPurchaseOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, poOrderNo } = req.query;

    // Parse page and limit as integers
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);

    const skip = (currentPage - 1) * itemsPerPage;

    const filter = { };
    if (poOrderNo) {
      filter.poOrderNo = poOrderNo;
    }

    // Get total count of purchase orders
    const totalCount = await PurchaseOrder.countDocuments(filter);

    // Fetch paginated purchase orders
    const purchaseOrders = await PurchaseOrder.find(filter)
      .select('poOrderNo clientName address orderDetails poDate')
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    // Format orders
    const formattedOrders = purchaseOrders.map(({ _id, poOrderNo, clientName, address, orderDetails, poDate }) => {
      const totalQuantity = orderDetails.reduce((sum, { quantity }) => sum + quantity, 0);
      const totalAmount = orderDetails.reduce((sum, { total }) => sum + total, 0);

      return {
        _id,
        poOrderNo,
        supplier: clientName,
        destination: address,
        quantity: totalQuantity,
        received: 0,
        total: totalAmount,
        orderedDate: poDate,
        action: 'Pending'
      };
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (!formattedOrders.length) {
      return res.status(404).json({ message: "No purchase orders found" });
    }

    return res.status(200).json({
      success: true,
      message: 'Purchase Orders fetched successfully!',
      data: {
        purchaseOrders: formattedOrders,
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
    return res.status(500).json({
      message: 'Error fetching purchase orders',
      error: error.message
    });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    return res.status(200).json(order); 
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  
      { new: true, runValidators: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

   return res.status(200).json(updatedOrder); e
  } catch (error) {
    return res.status(500).json({ message: 'Error updating order', error });
  }
};
const findOrdersByQueryParams = async (req, res) => {
  try {
    const filters = req.query; 
    const orders = await PurchaseOrder.find(filters);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found matching the criteria' });
    }

   return  res.status(200).json(orders); 
  } catch (error) {
    return res.status(500).json({ message: 'Error finding orders', error });
  }
};

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getOrderById,
  updateOrderById,
  findOrdersByQueryParams,
};

