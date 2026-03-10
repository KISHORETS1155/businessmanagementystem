const Datastore = require('nedb-promises');
const path = require('path');

// Initialize local JSON storage files under backend/data/
const usersDB = Datastore.create({ filename: path.join(__dirname, '../data/users.db'), autoload: true });
const customersDB = Datastore.create({ filename: path.join(__dirname, '../data/customers.db'), autoload: true });
const invoicesDB = Datastore.create({ filename: path.join(__dirname, '../data/invoices.db'), autoload: true });
const paymentsDB = Datastore.create({ filename: path.join(__dirname, '../data/payments.db'), autoload: true });

// Optional: Compact the databases regularly
usersDB.persistence.setAutocompactionInterval(86400000); // 1 day
customersDB.persistence.setAutocompactionInterval(86400000);
invoicesDB.persistence.setAutocompactionInterval(86400000);
paymentsDB.persistence.setAutocompactionInterval(86400000);

module.exports = {
  usersDB,
  customersDB,
  invoicesDB,
  paymentsDB
};
