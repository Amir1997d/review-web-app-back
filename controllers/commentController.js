const { Comment } = require('../models/commentModel');

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch comments' });
  }
}

const getCommentsByReviewId = async (req, res) => {
  try {
    const comments = await Comment.findAll(
      { where: { reviewId: req.params.reviewId }}
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch comments' });
  }
}

module.exports = {
  getAllComments,
  getCommentsByReviewId,
}