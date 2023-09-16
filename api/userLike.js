const express = require('express');
const router = express.Router();

const { getLikeByUserId, getLikeByReviewId, updateLikeStatus } = require('../controllers/userLikeController');

// router.get('/:userId', getLikeByUserId);
// router.get('/:reviewId', getLikeByReviewId);
router.put('/update-status', updateLikeStatus);

module.exports = router;