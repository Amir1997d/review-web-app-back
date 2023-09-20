const { Review } = require('../models/reviewModel');
const { UserReviewRating } = require('../models/userReviewRate');

const getRating = async (req, res) => {
  try {
    const { reviewId, userId } = req.body;
    const rated = await UserReviewRating.findOne({
      where: { reviewId: reviewId, userId: userId }
    });
    if(rated) {
      res.status(200).json({ message: "rating is founded!" });
    }
  } catch (error) {
    console.error('Error finding the rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
}

const addRating = async (req, res) => {
  try {
    const { rating, reviewId, userId } = req.body;
    await UserReviewRating.create({
      rating,
      reviewId,
      userId,
    });
    res.status(201).json({ message: "rating is added!" });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Unable to add rating' });
  }
}

const calAndUpdateAvgRating = async (req, res) => {
  let avgRating = null;
  let sum = 0;
  try{
    const { count, rows } = await UserReviewRating.findAndCountAll({
      where: { reviewId: req.params.reviewId }
    });
    if (count === 1) {
      avgRating = rows[0].rating;
    }
    else if(count > 1){
      const ratings = rows.map(row => row.rating);
      const reducer = (accumulator, curr) => accumulator + curr;
      sum = ratings.reduce(reducer);
      avgRating = sum / count;
    }
    await Review.update({ avgRate: avgRating }, {
      where: { id: req.params.reviewId }
    });
    res.status(201).json({ avgRate: avgRating , message: "average rating is calculated and updated!" });
  } catch(error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ error: 'Unable to add rating' });
  }
}

module.exports = {
  getRating,
  addRating,
  calAndUpdateAvgRating,
}