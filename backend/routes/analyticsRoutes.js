const express = require('express');
const router = express.Router();
const { getOverviewData } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/overview').get(protect, getOverviewData);

module.exports = router;
