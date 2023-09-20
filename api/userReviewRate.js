const express = require('express');
const router = express.Router();

const { getRating, addRating, calAndUpdateAvgRating } = require('../controllers/userReviewRateController');

router.post('/get-rating', getRating);
router.post('/add-rating', addRating);
router.get('/get-avg-rating/:reviewId', calAndUpdateAvgRating);

module.exports = router;