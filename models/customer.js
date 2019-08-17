const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  
  name: {
    type: String,
    //unique: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  designation: {
    type: String,
    required: true,
    trim : true
  },
  company_name: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    }
  
}));

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    designation: Joi.string().min(5).max(50).required(),
    company_name: Joi.string().min(5).max(50).required()
  };

return Joi.validate(customer, schema);
};

exports.Customer = Customer; 
exports.validate = validateCustomer;