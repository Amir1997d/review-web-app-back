const express = require('express');
const router = express.Router();

const { getTags, getAndCountTags, getTagsByReviewId, addTags } = require('../controllers/tagController');

router.get('/', getTags);
router.get('/tag-cloud-data', getAndCountTags);
router.get('/:reviewId', getTagsByReviewId);
router.post('/add-tags', addTags);

module.exports = router;