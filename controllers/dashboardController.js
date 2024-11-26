const PurchaseOrder = require('../models/purchaseOrder');

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
   
   

   console.log(filter)

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



module.exports = {
    totalOrder,
   // totalPendingOrder
}