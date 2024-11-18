const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  grade: {
    type: String,
    trim: true
  },
  birthdate: {
    type: Date
  },
  address: {
    type: String,
    trim: true
  },
  marital_status: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed'],
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  zip_code: {
    type: String,
    trim: true
  },
  anniversary_date: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'superadmin', 'mainadmin', 'hr', 'finance','employee'], // do a create api here
    // required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: { 
    type: String 
  },
  resetPasswordExpires: { 
    type: Date 
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  joining_date : {
      type: Date
  },
  resignationDate : {
    type : Date,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    // required: true
  },
  department: {
    type: String,
    enum: ['sales', 'finance', 'marketing', 'IT', 'leagl'],
    required: true
  },
  active_projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActiveProject' // Reference to the ActiveProjects model
  }],
  upcoming_leaves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leave' // Reference to the Leaves model
  }],
  status: {
    type: String,
    enum: ['working', 'on leave', 'resigned'],
    default: 'working'
  },
  notes: [{
    text: String,
    date: {
      type: Date,
      default: Date.now
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
  }],
  token: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;


