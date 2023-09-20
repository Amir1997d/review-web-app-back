const { UserReviewLike } = require('../models/userLikeModel');

const getLike = async (req, res) => {
  try {
    const { userId, reviewId } = req.body;
    const like = await UserReviewLike.findOne({
        where: { userId, reviewId }
    });
    if(like) {
      res.status(200).json({ message: "like got deleted!" });
    }
  } catch (error) {
    console.error('Error finding like:', error);
    res.status(500).json({ error: 'Unable to find like' });
  }
}

const addLike = async (req, res) => {
  try {
    const { userId, reviewId } = req.body;
    await UserReviewLike.create({
        userId, 
        reviewId 
    });
    res.status(200).json({ message: "like got added!" });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Unable to add like' });
  }
}

const deleteLike = async (req, res) => {
  try {
    const { userId, reviewId } = req.body;
    await UserReviewLike.destroy({
        where: { userId, reviewId }
    });
    res.status(200).json({ message: "like got deleted!" });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({ error: 'Unable to delete like' });
  }
}

const sumOfLikes = async (req, res) => {
  try {
    const { count, rows } = await UserReviewLike.findAndCountAll({
        where: { reviewId: req.params.reviewId }
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting likes:', error);
    res.status(500).json({ error: 'Unable to count likes' });
  }
}

module.exports = {
  getLike, 
  addLike, 
  deleteLike,
  sumOfLikes
}