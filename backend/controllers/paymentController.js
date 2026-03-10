const { paymentsDB, invoicesDB, customersDB } = require('../config/db');

const getPayments = async (req, res) => {
  try {
    const payments = await paymentsDB.find({}).sort({ createdAt: -1 });
    
    // Manual populate for NeDB
    const populatedPayments = await Promise.all(payments.map(async (payment) => {
      const invoice = await invoicesDB.findOne({ _id: payment.invoiceId }) || {};
      const customer = await customersDB.findOne({ _id: invoice.customerId }) || {};
      
      return { 
        ...payment, 
        invoiceId: { 
          ...invoice, 
          customerId: customer 
        } 
      };
    }));

    res.json(populatedPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayment = async (req, res) => {
  const { invoiceId, amount, paymentMethod } = req.body;

  try {
    const invoice = await invoicesDB.findOne({ _id: invoiceId });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const createdPayment = await paymentsDB.insert({
      invoiceId,
      amount,
      paymentMethod,
      status: 'Completed',
      paymentDate: new Date(),
      createdAt: new Date()
    });

    // Update invoice status to Paid
    await invoicesDB.update({ _id: invoiceId }, { $set: { status: 'Paid', updatedAt: new Date() } });

    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPayments,
  createPayment
};
