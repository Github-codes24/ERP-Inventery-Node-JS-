const express = require("express");
const router = express.Router();
const quotationController = require("../controllers/quotationController");

router.post("/createQuotation", quotationController.createQuotation);
router.get("/getQuotationById/:id", quotationController.getQuotationById);
router.put("/deleteQuotationById/:id", quotationController.deleteQuotationById);
router.get("/getAllQuotation",quotationController.getAllQuotations)
router.put("/updateQuotation/:id",quotationController.updateQuotation);
router.get("/getSrNoForQuotation",quotationController.getNewSrNumber);
router.get("/getStates", quotationController.getStates);
router.get("/getCities", quotationController.getCities);
router.get("/getCountry", quotationController.getCountry);
module.exports = router;