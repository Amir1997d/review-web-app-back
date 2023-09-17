const { Op } = require('sequelize');
const { Review } = require('../models/reviewModel');
const { Comment } = require('../models/commentModel');
const { Tag } = require('../models/tagModel');
const { UserReviewLike } = require('../models/userLikeModel');
const { UserReviewRating } = require('../models/userReviewRate');

// All reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
}

// Top reviews
const getTopReviews = async (req, res) => {
  try {
    const topReviews = await Review.findAll({
      where: {
        avgRate: {
          [Op.not]: null,
        },
      },
      order: [
        ['avgRate', 'DESC']
      ]
    });
    res.status(200).json(topReviews);
  } catch (error) {
    console.error('Error fetching top reviews:', error);
    res.status(500).json({ error: 'Unable to fetch top reviews' });
  }
}

// Recently reviews
const getRecentlyReviews = async (req, res) => {
  try {
    const recentlyReviews = await Review.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).json(recentlyReviews);
  } catch (error) {
    console.error('Error fetching recently eviews:', error);
    res.status(500).json({ error: 'Unable to fetch recently reviews' });
  }
}

// Review by "reviewId"
const getReviewByReviewId = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.reviewId
      },
      include: [
        {
          model: Tag,
        },
        {
          model: Comment
        }
      ]
    });
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Unable to fetch review' });
  }
}

// Review by "userId"
const getReviewsByUserId = async (req, res) => {
  try {
    let reviews = await Review.findAll({
      where: {
        userId: req.params.userId
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
}

// Create review and Add its Tags
const createReview = async (req, res) => {
  try {
    const { name, reviewedItemName, group, text, imgUrl, grade, avgRate, author, tags, userId } = req.body;
    const newReview = await Review.create({
      name,
      reviewedItemName,
      group,
      text,
      imgUrl,
      grade,
      avgRate,
      author,
      userId,
    });
    const tagPromises = tags.map(async (tag) => {
      const reviewTag = await Tag.create({ name: tag });
      await newReview.addTags([reviewTag]);
    });
    await Promise.all(tagPromises);
    res.status(201).json({ message: "review is added!" });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Unable to create review' });
  }
}

// Delete review
const deleteReview = async (req, res) => {
  try {
    await Review.destroy({
      where: {
        id: req.params.reviewId
      }
    });
    res.status(202).json({ message: "review is deleted!" });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Unable to delete review' });
  }
}

module.exports = {
  getReviews,
  getTopReviews,
  getRecentlyReviews,
  getReviewByReviewId,
  getReviewsByUserId,
  createReview,
  deleteReview
}