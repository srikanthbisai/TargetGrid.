const express = require('express');
const router = express.Router();
const zohoCrm = require('../services/zohoCrm'); // Import Zoho CRM integration service

// Add a new customer
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Push to CRM
router.post('/push-to-crm', async (req, res) => {
  try {
    const customerData = req.body; 

    const response = await zohoCrm.pushToCrm(customerData);
    res.json(response);
  } catch (err) {
    console.error('Error pushing customer to Zoho CRM:', err);


    res.status(500).json({ message: 'Error pushing customer to CRM' });
  }
});

module.exports = router;