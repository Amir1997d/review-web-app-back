const express = require('express');
const router = express.Router();

const { getReviews, createReview } = require('../controllers/reviewsController');

router.get('/', getReviews);
router.post('/create-review', createReview);

module.exports = router;