const express = require("express");
const multer = require("multer");
const proposalController = require("../controllers/proposalController");
const router = express.Router();
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/createProposal', upload.fields([
    { name: 'coveringLetter', maxCount: 1 },
    { name: 'specification', maxCount: 1 },
    { name: 'quotation', maxCount: 1 }
  ]), proposalController.createProposal);


router.get("/getAllProposals", proposalController.getAllProposals);
//router.get("/getProposalByName", proposalController.getProposalByName);

router.put(
  "/updateProposal/:id",
  upload.fields([
    { name: "coveringLetter" },
    { name: "specification" },
    { name: "quotation" }
  ]),
  proposalController.updateProposal
);
router.get("/getProposalType",proposalController.getProposalType);
router.get("/getResponsibleDepartments",proposalController.getResponsibleDepartments);
router.get("/getClientNames",proposalController.getClientNames);
router.get("/getAssignedTo",proposalController.getAssignedTo);
router.put("/deleteProposal/:id", proposalController.deleteProposal);
router.get("/getProposalById/:id", proposalController.getProposalById);
router.get("/getProposalType", proposalController.getProposalType);
router.get("/getAssignedTo", proposalController.getAssignedTo);
router.get("/getResponsibleDepartments", proposalController.getResponsibleDepartments);
router.get("/getClientNames", proposalController.getClientNames);
router.get("/getSrNoForProposal", proposalController.getNewSrNumber);
module.exports = router;