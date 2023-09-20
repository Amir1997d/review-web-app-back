const express = require('express');
const router = express.Router();

const { getLike, addLike, deleteLike, sumOfLikes } = require('../controllers/userLikeController');

router.post('/get-like', getLike);
router.post('/add-like', addLike);
router.delete('/delete-like', deleteLike);
router.get('/:reviewId', sumOfLikes);

module.exports = router;