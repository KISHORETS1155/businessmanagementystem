const { customersDB, invoicesDB } = require('../config/db');

const getOverviewData = async (req, res) => {
  try {
    const totalCustomers = await customersDB.count({});
    const totalInvoices = await invoicesDB.count({});
    
    const invoices = await invoicesDB.find({});
    
    const totalRevenue = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const pendingPayments = invoices
      .filter(i => i.status !== 'Paid')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const paidInvoicesCount = invoices.filter(i => i.status === 'Paid').length;
    const pendingInvoicesCount = totalInvoices - paidInvoicesCount;

    // Monthly revenue logic via JS reduction since NeDB lacks aggregation
    const monthlyRevenueMap = {};
    
    invoices.forEach(invoice => {
      if (invoice.status === 'Paid') {
        const month = new Date(invoice.invoiceDate).getMonth() + 1; // 1 to 12
        if (!monthlyRevenueMap[month]) {
          monthlyRevenueMap[month] = 0;
        }
        monthlyRevenueMap[month] += invoice.totalAmount;
      }
    });

    const monthlyRevenue = Object.keys(monthlyRevenueMap).map(month => ({
      _id: parseInt(month),
      total: monthlyRevenueMap[month]
    })).sort((a, b) => a._id - b._id); // Sort by month explicitly

    res.json({
      totalCustomers,
      totalInvoices,
      totalRevenue,
      pendingPayments,
      paidInvoicesCount,
      pendingInvoicesCount,
      monthlyRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOverviewData
};
