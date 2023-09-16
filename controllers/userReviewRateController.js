const { UserReviewRating } = require('../models/userReviewRate');

const getRatesByReviewId = async (req, res) => {
  try {
    const reviews = await UserReviewRating.findAll(
        { where: { reviewId: req.params.reviewId }}
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Unable to fetch ratings' });
  }
}

const addRating = async (req, res) => {
  try {
    const { rating, reviewId, userId } = req.body;
    await UserReviewRating.create({
      rating: rating,
      reviewId: reviewId,
      userId: userId,
    });
    res.status(201).json({ message: "rating is added!" });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Unable to add rating' });
  }
}

module.exports = {
    getRatesByReviewId,
    addRating,
}