const Company = require('../models/company.model');
const User = require("../models/user.model")


const companiesData = [
  {
    name: "Unisol",
    address: "456 Tech Road, Austin, TX 78701",
    industry: "Technology",
    founded: "2010-09-12",
    employees: 500,
    website: "https://www.unisol.com"
  },  
  {
      name: "Surgisol",
      address: "123 Medical Park Ave, San Francisco, CA 94103",
      industry: "Healthcare",
      founded: "2005-04-18",
      employees: 150,
      website: "https://www.surgisol.com"
    },
    {
      name: "Envirosolution",
      address: "789 Greenway Blvd, Seattle, WA 98109",
      industry: "Environmental Services",
      founded: "1998-02-24",
      employees: 200,
      website: "https://www.envirosolution.com"
    },
    {
      name: "Ignitesphere",
      address: "321 Innovation St, Boston, MA 02110",
      industry: "Energy",
      founded: "2015-11-30",
      employees: 300,
      website: "https://www.ignitesphere.com"
    }
  ];

  async function seedCompanies(req, res) {
    try {
      const result = await Company.insertMany(companiesData);
      return res.status(200).json({message : "company seeding successfull"})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

async function getAllCompanies(req, res){
    try {
        const companies = await Company.find({},'_id name');
        if(companies.length === 0){
            return res.status(400).json({message : "Failed to fetch companies"})
        }
        return res.status(200).json(companies);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

async function selectCompany(req, res){
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
        return res.status(200).json(company);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

async function getUsersByCompany(req, res){
  try {
    const companyId = req.params.companyId;
   

    const users = await User.find({companyId }).populate('companyId');

    // If no users are found, return a 404 status with a message
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this company' });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }

};



module.exports = {
    seedCompanies,
    getAllCompanies,
    selectCompany,
    getUsersByCompany
}