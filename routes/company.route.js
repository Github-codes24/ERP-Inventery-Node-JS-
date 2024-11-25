const express = require("express")
const router = express.Router()
const companyController = require("../controllers/company.controller")


router.post("/seedCompanies", companyController.seedCompanies)
router.get("/getAllCompanies", companyController.getAllCompanies);
router.get("/selectCompany/:id", companyController.selectCompany);
router.get("/getUsersByCompany/:companyId", companyController.getUsersByCompany);
module.exports = router ;