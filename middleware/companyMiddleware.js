const Company = require('../models/company.model');

// Middleware to check companyId and set Company as req.company
const checkCompanyId = async (req, res, next) => {
  try {
    // Get companyId from request body, query, or headers
    const companyId =req.headers['companyId'];

    // Check if companyId is provided
    if (!companyId) {
      return res.status(400).json({ error: 'Company ID is required.' });
    }

    // Find the company by ID
    const company = await Company.findById(companyId);

    // If the company is not found, return an error
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }


    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Error checking company ID:', err);
    return res.status(500).json({ error: 'An error occurred while checking the company ID.' });
  }
};

module.exports = checkCompanyId;
