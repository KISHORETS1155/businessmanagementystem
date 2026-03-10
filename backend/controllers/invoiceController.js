const { invoicesDB, customersDB } = require('../config/db');

const getInvoices = async (req, res) => {
  try {
    // NeDB doesn't support populate out of the box so we manual populate
    const invoices = await invoicesDB.find({}).sort({ createdAt: -1 });
    
    const populatedInvoices = await Promise.all(invoices.map(async (invoice) => {
      const customer = await customersDB.findOne({ _id: invoice.customerId });
      return { ...invoice, customerId: customer || { name: 'Unknown' } };
    }));

    res.json(populatedInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoicesDB.findOne({ _id: req.params.id });
    if (invoice) {
        const customer = await customersDB.findOne({ _id: invoice.customerId });
        res.json({ ...invoice, customerId: customer || { name: 'Unknown' } });
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInvoice = async (req, res) => {
  const { invoiceNumber, customerId, invoiceDate, dueDate, items, subtotal, tax, totalAmount } = req.body;

  try {
    const createdInvoice = await invoicesDB.insert({
      invoiceNumber,
      customerId,
      invoiceDate,
      dueDate,
      items,
      subtotal,
      tax,
      totalAmount,
      createdBy: req.user._id,
      status: 'Draft',
      createdAt: new Date()
    });

    res.status(201).json(createdInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInvoiceStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const invoice = await invoicesDB.findOne({ _id: req.params.id });

    if (invoice) {
      await invoicesDB.update({ _id: req.params.id }, { $set: { status, updatedAt: new Date() } });
      const updatedInvoice = await invoicesDB.findOne({ _id: req.params.id });
      
      // Simulate sending email if status is changed to Sent
      if (status === 'Sent') {
        console.log(`[SIMULATED EMAIL] Invoice ${invoice.invoiceNumber} sent effectively to customer.`);
      }

      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const numRemoved = await invoicesDB.remove({ _id: req.params.id }, {});
    if (numRemoved > 0) {
      res.json({ message: 'Invoice removed' });
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice
};
