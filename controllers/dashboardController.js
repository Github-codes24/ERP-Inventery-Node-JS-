const PurchaseOrder = require('../models/purchaseOrder');
const Product = require('../models/productModel');
const Quotation = require('../models/quotation');
const moment = require('moment');
const totalOrder = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query; // Dates should be in 'YYYY-MM-DD' format

  // Build the filter object
  let filter = {}; 

    if (fromDate && toDate) {
      if (
        !moment(fromDate, "YYYY-MM-DD", true).isValid() ||
        !moment(toDate, "YYYY-MM-DD", true).isValid()
      ) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Please use 'YYYY-MM-DD'." });
      }

      filter.poDate = { $gte: fromDate, $lte: toDate };
    }
   
   

   

    // Query the database based on the filter
 const totalOrder = await PurchaseOrder.countDocuments(filter);

    if (totalOrder === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ totalOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const totalInventoryValue= async(req,res)=>{
  try{
    const inventoryValue = await Product.find().select('companyPrice');
    const totalValue = inventoryValue.reduce((sum,product)=>{
      const price = parseInt(product.companyPrice, 10) || 0; 
      return sum + price;
    }, 0);
   return res.status(200).json({message:"total inventory Value",
    totalValue
   })
  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }


}

const lowInventoryProduct = async(req,res)=>{
  try{
 const lowInventoryNumber = await Product.countDocuments({ quantity: { $lte: 3 } })

  return res.status(200).json({data:lowInventoryNumber})
  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
const getRecentOrders = async (req, res) => {
  try {
    // Extract optional date filters from query parameters
    const { fromDate, toDate } = req.query;

    let startDate;
    let endDate;

    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      return res.status(400).json({
        message: "Both 'fromDate' and 'toDate' are required if one is provided.",
      });
    }

    // Validate and set the date range
    if (fromDate && toDate) {
      if (
        !moment(fromDate, "YYYY-MM-DD", true).isValid() ||
        !moment(toDate, "YYYY-MM-DD", true).isValid()
      ) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Please use 'YYYY-MM-DD'." });
      }
      // Use fromDate and toDate from the query
      startDate = moment.utc(fromDate).startOf("day").toDate();
      endDate = moment.utc(toDate).endOf("day").toDate();
    } else {
      
      endDate = moment.utc().endOf("day").toDate();
      startDate = moment.utc().subtract(30, "days").startOf("day").toDate();
    }

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    const recentOrders = await PurchaseOrder.find({
      $or: [
        { createdAt: { $gte: startDate, $lte: endDate } },
        { updatedAt: { $gte: startDate, $lte: endDate } },
      ],
    });

    res.status(200).json({
      success: true,
      data: recentOrders.length,
    });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent orders",
    });
  }
};

// const totalPendingOrder = async (req, res) => {
//   try {
//     const { month, year } = req.query;

//     let filter = {}; // Default filter (fetch all data)

//     if (month || year) {
//       // Validate month and year
//       if (!month || !year || isNaN(month) || isNaN(year) || month < 1 || month > 12) {
//         return res.status(400).json({ message: "Invalid month or year provided." });
//       }

//       // Generate start and end dates for the given month and year
//       const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD", true).startOf("month").toDate();
//       const endDate = moment(startDate).endOf("month").toDate();

//       if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) {
//         return res.status(400).json({ message: "Invalid date range generated." });
//       }

//       // Add date range to filter
//       filter.poDate = { $gte: startDate, $lte: endDate };
//     }

//     filter.status = "Pending";

//     // Query the database based on the filter
//     const totalPendingOrder = await PurchaseOrder.countDocuments(filter);

//     if (totalOrder === 0) {
//       return res.status(404).json({ message: "No Pending orders found." });
//     }

//     return res.status(200).json({ totalPendingOrder });
//   } catch (error) {
//     console.error("Error in totalPendingOrder:", error);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

const getReplenishmentActions = (req, res) => {
  const replenishablestock = 12; // Example stock value
  try {
    // Send a successful response
    return res.status(200).json({
      success: true,
      replenishablestock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching replenishablestock",
    });
  }
};

const getLatestQuotation = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Parse page and limit as integers
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);

    const skip = (currentPage - 1) * itemsPerPage;

    // Get the total count of documents
    const totalCount = await Quotation.countDocuments();

    // Fetch quotations with pagination and sort by creation date
    const data = await Quotation.find()
      .select(
        "quotationNo quotationDate quotationName items.quantity from.companyAddress"
      )
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    // Check if data exists
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Quotations not found" });
    }

    // Extract the first quantity item manually
    const processedData = data.map((quotation) => ({
      quotationNo: quotation.quotationNo,
      quotationDate: quotation.quotationDate,
      quotationName: quotation.quotationName,
      firstQuantity: quotation.items?.[0]?.quantity || null, // Safely access the first quantity
      companyAddress: quotation.from?.companyAddress || null, // Safely access companyAddress
    }));

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPages,
      totalCount,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      itemsPerPage,
      data: processedData,
    });
  } catch (error) {
    console.log(error.message); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Error fetching Quotations",
      error: error.message, // Include error details in the response
    });
  }
};



module.exports = {
    totalOrder,
    getRecentOrders,
    getReplenishmentActions,
// totalPendingOrder
   totalInventoryValue,
   lowInventoryProduct,
  getLatestQuotation
}