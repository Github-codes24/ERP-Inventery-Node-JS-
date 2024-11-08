const express = require("express");
const multer = require("multer");
const proposalController = require("../controllers/proposalController");

const router = express.Router();

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
router.post('/', upload.fields([
    { name: 'coveringLetter', maxCount: 1 },
    { name: 'specification', maxCount: 1 },
    { name: 'quotation', maxCount: 1 }
  ]), proposalController.createProposal);


router.get("/", proposalController.getAllProposals);
router.get("/name/:name", proposalController.getProposalByName);

router.put(
  "/:id",
  upload.fields([
    { name: "coveringLetter" },
    { name: "specification" },
    { name: "quotation" }
  ]),
  proposalController.updateProposal
);

router.delete("/:id", proposalController.deleteProposal);

module.exports = router;



