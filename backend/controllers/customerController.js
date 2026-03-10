const { customersDB } = require('../config/db');

const getCustomers = async (req, res) => {
  try {
    let query = {};
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, 'i');
      query = { name: regex };
    }
    
    // NeDB find always returns an array
    const customers = await customersDB.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customersDB.findOne({ _id: req.params.id });
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { name, email, phone, company, address, gstNumber } = req.body;

  try {
    const createdCustomer = await customersDB.insert({
      name,
      email,
      phone,
      company,
      address,
      gstNumber,
      createdAt: new Date()
    });
    res.status(201).json(createdCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const { name, email, phone, company, address, gstNumber } = req.body;

  try {
    const customer = await customersDB.findOne({ _id: req.params.id });

    if (customer) {
      const updatedCustomer = {
        ...customer,
        name: name || customer.name,
        email: email || customer.email,
        phone: phone || customer.phone,
        company: company || customer.company,
        address: address || customer.address,
        gstNumber: gstNumber || customer.gstNumber,
        updatedAt: new Date()
      };

      await customersDB.update({ _id: req.params.id }, updatedCustomer);
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const numRemoved = await customersDB.remove({ _id: req.params.id }, {});
    
    if (numRemoved > 0) {
      res.json({ message: 'Customer removed' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
