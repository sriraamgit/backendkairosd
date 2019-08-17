const {User, validat} = require('../models/user');
const {Customer, validate} = require('../models/customer');
const auth= require('../middleware/auth');
const admin = require('../middleware/admin');

const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await User.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 
  for (let i = 1; i < User.length; i++)
  {
    async function listCustomers () {
      const cust = await Customer
          .find()
          .populate('user', 'name')
      
          .select('name designation company_name')
          .lean().exec(function(err, Customer) {
            if(cust){
              console.log('message :', success);
            }
          }); 
             
        }
        listCustomers();
      
  }        
 
  let customer = new Customer({ 
    name: req.body.name,
    designation: req.body.designation,
    company_name: req.body.company_name
  });

  customer = await customer.save();
 
  res.send(customer);
  
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  
  const customer = await Customer.findByIdAndRemove(req.params.id)
        
            if (!customer) return res.status(404).send('The customer with the given ID name was not found.')
            
            res.send(customer);
}); 


router.get('/:id ', async (req, res) => {
  const customer = await Customer.findById(req.params.id) 
  
  if (!customer) return res.status(404).send('The customer with the given ID was not found.')
    
  res.send(customer);
});

module.exports = router; 