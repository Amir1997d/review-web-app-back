const express = require('express');
const router = express.Router();

const { getReviews, 
        getTopReviews, 
        getRecentlyReviews,
        createReview, 
        getReviewByReviewId, 
        getReviewsByUserId,
        deleteReview 
    } = require('../controllers/reviewController');

router.get('/', getReviews);
router.get('/top-reviews', getTopReviews);
router.get('/recently-reviews', getRecentlyReviews);
router.get('/user-reviews/:userId', getReviewsByUserId);
router.get('/:reviewId', getReviewByReviewId);
router.post('/create-review', createReview);
router.delete('/delete-review/:reviewId', deleteReview);

module.exports = router;