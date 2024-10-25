const Client = require('../models/client');
const mongoose = require('mongoose');

const registerClient = async (req, res) => {
    try {
        // Destructure all values from req.body
        const {
            dealerName,
            manufacturerName,
            productName,
            productCode,
            description,
            hsnCode,
            companyPrice,
            applicableGst,
            buyingPrice,
            sellingPrice,
            mouValidity,
            technicalSpecification
        } = req.body;

        const {tertAuthFile, pptFile, coverLetterFile, productCertFile, isoCertFile, brochureFile } = req.files;
        
        let tertAuthFileName, pptFileName, coverLetterFileName, productCertFileName, isoCertFileName, brochureFileName ;

        if (tertAuthFile) {
            tertAuthFileName = tertAuthFile[0]?.originalname;
        };
        if (pptFile) {
            pptFileName = pptFile[0]?.originalname;
        }
        if (coverLetterFile) {
            coverLetterFileName = coverLetterFile[0]?.originalname;
        }
        if (productCertFile) {
            productCertFileName = productCertFile[0]?.originalname;
        }
        if (isoCertFile) {
            isoCertFileName = isoCertFile[0]?.originalname;
        }
        if (brochureFile) {
            brochureFileName = brochureFile[0]?.originalname;
        }

        // Create a new client object with destructured variables and file paths
        const client = new Client({
            dealerName,
            manufacturerName,
            productName,
            productCode,
            description,
            hsnCode,
            companyPrice,
            applicableGst,
            buyingPrice,
            sellingPrice,
            mouValidity,
            technicalSpecification,
            tertAuthFile: tertAuthFileName,
            pptFile: pptFileName,
            coverLetterFile: coverLetterFileName,
            productCertFile: productCertFileName,
            isoCertFile: isoCertFileName,
            brochureFile: brochureFileName
        });

        // Save the client to the database
        await client.save();
        return res.status(201).json(client);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const findClient = async (req, res) => {
    try {
        const query = req.query;
        const clients = await Client.find(query);

        if (clients.length === 0) {
            return res.status(404).json({ message: 'No clients found matching the criteria.' });
        }

        res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateClient = async (req, res) => {
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
         return res.status(500).json({ error: error.message });
    }
};

const getClientById = async (req, res) => {
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
       return  res.status(500).json({ error: error.message });
    }
};

// Export all the functions at the end
module.exports = {
    registerClient,
    getAllClients,
    findClient,
    updateClient,
    getClientById
};
