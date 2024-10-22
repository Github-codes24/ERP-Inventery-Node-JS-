const Client = require('../models/client');
const upload = require('../middleware/multer'); // Import multer configuration
const mongoose = require('mongoose');
exports.registerClient = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            // Create a new client object with file paths
            const client = new Client({
                dealerName: req.body.dealerName,
                manufacturerName: req.body.manufacturerName,
                productName: req.body.productName,
                productCode: req.body.productCode,
                description: req.body.description,
                hsnCode: req.body.hsnCode,
                companyPrice: req.body.companyPrice,
                applicableGst: req.body.applicableGst,
                buyingPrice: req.body.buyingPrice,
                sellingPrice: req.body.sellingPrice,
                mouValidity: req.body.mouValidity,
                tertAuthFile: req.files['tertAuthFile'] ? req.files['tertAuthFile'][0].path : '',
                pptFile: req.files['pptFile'] ? req.files['pptFile'][0].path : '',
                coverLetterFile: req.files['coverLetterFile'] ? req.files['coverLetterFile'][0].path : '',
                productCertFile: req.files['productCertFile'] ? req.files['productCertFile'][0].path : '',
                isoCertFile: req.files['isoCertFile'] ? req.files['isoCertFile'][0].path : '',
                brochureFile: req.files['brochureFile'] ? req.files['brochureFile'][0].path : '',
                technicalSpecification:req.body.technicalSpecification
            });

            // Save the client to the database
            await client.save();
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

exports.getAllClients = async (req, res) => {
    try {
       
        const clients = await Client.find();

        res.status(200).json(clients);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};

exports.findClient = async (req, res) => {
    try {
        
        const query = req.query;

        
        const clients = await Client.find(query);

        
        if (clients.length === 0) {
            return res.status(404).json({ message: 'No clients found matching the criteria.' });
        }

        res.status(200).json(clients);
    } catch (error) {
       
        res.status(500).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ message: 'Invalid Client ID' });
        }

        const updatedClient = await Client.findByIdAndUpdate(
            clientId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const clientId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ message: 'Invalid Client ID' });
        }

        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};