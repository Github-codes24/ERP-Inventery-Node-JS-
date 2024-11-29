const PurchaseOrder = require('../models/purchaseOrder');
const Product = require('../models/productModel');
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



const getInventoryLevel = async (req, res) => {
  const { filterby } = req.query;

  try {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // End of today
    let startDate = new Date();

    // Determine the date range based on the filter
    if (filterby === "weekly") {
      startDate.setDate(endDate.getDate() - 7); // Past 7 days
    } else if (filterby === "monthly") {
      startDate.setDate(endDate.getDate() - 30); // Past 30 days
    } else if (filterby === "yearly") {
      startDate.setFullYear(endDate.getFullYear() - 1); // Past 12 months
    } else {
      return res.status(400).json({
        error: "Please specify a valid filter: weekly, monthly, or yearly.",
      });
    }

    // Dynamically construct the aggregation pipeline
    const pipeline = [];
    if (filterby === "weekly" || filterby === "monthly") {
      pipeline.push(
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: filterby === "weekly" ? { $dateToString: { format: "%Y-%m-%d", date: "$date" } } : null,
            totalQuantity: { $sum: { $toInt: "$quantity" } },
          },
        },
        { $sort: { _id: 1 } }
      );
    } else if (filterby === "yearly") {
      pipeline.push(
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            totalQuantity: { $sum: { $toInt: "$quantity" } },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      );
    }

    const results = await Product.aggregate(pipeline);

    // Handle the response based on the filter type
    if (filterby === "weekly" || filterby === "monthly") {
      const dailyTotals = results.map((day) => ({
        date: day._id,
        totalQuantity: day.totalQuantity,
      }));

      if (filterby === "weekly") {
        // Calculate daily percentage changes for weekly
        const dailyPercentageChanges = dailyTotals.map((day, index) => {
          const previousTotal = index > 0 ? dailyTotals[index - 1].totalQuantity : 0;
          const percentageChange =
            previousTotal > 0 ? ((day.totalQuantity - previousTotal) / previousTotal) * 100 : 0;
          return {
            date: day.date,
            totalQuantity: day.totalQuantity,
            percentageChange: percentageChange.toFixed(2), // Limit to 2 decimals
          };
        });

        return res.status(200).json({
          dailyTotals,
          dailyPercentageChanges,
        });
      }

      // Return total quantities for monthly
      return res.status(200).json({
        dailyTotals,
      });
    } else if (filterby === "yearly") {
      // Calculate percentage changes for yearly
      const monthlyTotals = results.map((month) => ({
        month: `${month._id.year}-${String(month._id.month).padStart(2, "0")}`,
        totalQuantity: month.totalQuantity,
      }));

      const percentageChanges = monthlyTotals.map((month, index) => {
        if (index === 0) return { month: month.month, percentageChange: null }; // No comparison for the first month
        const previousTotal = monthlyTotals[index - 1].totalQuantity;
        const percentageChange =
          previousTotal > 0 ? ((month.totalQuantity - previousTotal) / previousTotal) * 100 : 0;
        return {
          month: month.month,
          percentageChange: percentageChange.toFixed(2),
        };
      });

      return res.status(200).json({
        monthlyTotals,
        percentageChanges,
      });
    }
  } catch (error) {
    console.error("Error fetching inventory levels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};









module.exports = {
    totalOrder,
    getRecentOrders,
    getReplenishmentActions,
// totalPendingOrder
   totalInventoryValue,
   lowInventoryProduct,
   getInventoryLevel
}