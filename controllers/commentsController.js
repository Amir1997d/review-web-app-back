const { Comment } = require('../models/commentModel');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
}

const createComment = async (req, res) => {
  try {
    const { text, reviewId } = req.body;
    await Comment.create({
      text,
      reviewId
    });
    res.status(201).json({ message: "comment is added!" });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Unable to create comment' });
  }
}

module.exports = {
    getComments,
    createComment,
}