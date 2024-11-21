const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10 * 1024 * 1024 },
});

// Route for client registration

router.get("/findClientByQuery", clientController.findClient);

router.put(
    "/updateClient/:id",
    upload.fields([
        { name: "teritaryAuthFile", maxCount: 1 },
        { name: "pptFile", maxCount: 1 },
        { name: "coverLetterFile", maxCount: 1 },
        { name: "productCertificate", maxCount: 1 },
        { name: "isoCertificate", maxCount: 1 },
        { name: "brochureFile", maxCount: 1 },
    ]),
    clientController.updateClient,
);
router.get("/getClientById/:id", clientController.getClientById);
router.post(
    "/createClient",
    upload.fields([
        { name: "teritaryAuthFile", maxCount: 1 },
        { name: "pptFile", maxCount: 1 },
        { name: "productCertificate", maxCount: 1 },
        { name: "isoCertificate", maxCount: 1 },
        { name: "brochureFile", maxCount: 1 },
    ]),
    clientController.createClient,
);
module.exports = router;