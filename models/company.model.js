const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address : {
    type : String,
  },
  industry : {
    type : String
  },
  founded : String,
  employees : Number,
  website : String
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
