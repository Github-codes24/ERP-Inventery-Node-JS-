const Bank = require("../models/bank.model");

// Create a new bank
const createBank = async (req, res) => {
  try {
    const bank = await Bank.create(req.body);
    return res.status(201).json({ success: true, bank });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all banks
const getBanksName = async (req, res) => {
  try {
    const banks = await Bank.find().select("bankName");

    const bankNames = banks.map(bank => bank.bankName);
    return res.status(200).json({ success: true, banks: bankNames });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get bank by ID

const getBankById = async (req, res) => {
    try {
        const id = req.params.id;
        const bank = await Bank.findById(id);
    
        if (!bank) {
        return res.status(404).json({ message: "Bank not found" });
        }
    
        return res.status(200).json({ success: true, bank });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
    }

    module.exports = {
        createBank,
        getBanksName,
        getBankById
    }