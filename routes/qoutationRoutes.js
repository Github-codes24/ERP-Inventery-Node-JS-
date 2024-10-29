const express = require("express");
const router = express.Router();
const quotationController = require("../controllers/quotationController");

router.post("/create", quotationController.createQuotation);
router.get("/getByID/:id", quotationController.getQuotationById);
router.delete("/delete/:id", quotationController.deleteQuotationById);
router.get("/getAllQuotation",quotationController.getAllQuotations)
router.put("/update",quotationController.updateQuotation);
module.exports = router;
