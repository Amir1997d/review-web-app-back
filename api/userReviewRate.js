const express = require('express');
const router = express.Router();

const { getRatesByReviewId, addRating } = require('../controllers/tagController');

router.get('/:reviewId', getRatesByReviewId);
router.post('/add-rating', addRating);

module.exports = router;