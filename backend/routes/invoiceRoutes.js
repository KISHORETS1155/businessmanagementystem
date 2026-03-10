const express = require('express');
const router = express.Router();
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getInvoices)
  .post(protect, createInvoice);

router.route('/:id')
  .get(protect, getInvoiceById)
  .delete(protect, deleteInvoice);

router.route('/:id/status')
  .put(protect, updateInvoiceStatus);

module.exports = router;
