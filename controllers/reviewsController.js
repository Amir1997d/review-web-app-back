const { Review } = require('../models/reviewModel');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
}

const createReview = async (req, res) => {
  try {
    const { name, reviewedItemName, group, text, imgUrl, grade } = req.body;
    await Review.create({
      name,
      reviewedItemName,
      group,
      text,
      imgUrl,
      grade
    });
    res.status(201).json({ message: "review is added!" });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Unable to create review' });
  }
}

module.exports = {
  getReviews,
  createReview,
}