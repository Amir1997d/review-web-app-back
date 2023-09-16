const { UserReviewLike } = require('../models/userLikeModel');

// const getLikeByUserId = async (req, res) => {
//   try {
//     await UserReviewLike.findOne(
//         { where: { userId: req.param.userId }}  
//     );
//     res.status(200).json(tags);
//   } catch (error) {
//     console.error('Error fetching tags:', error);
//     res.status(500).json({ error: 'Unable to fetch tags' });
//   }
// }

// const getLikeByReviewId = async (req, res) => {
//   try {
//     await UserReviewLike.findOne(
//         { where: { userId: req.param.userId }}  
//     );
    
//     const { count, rows } = await UserReviewLike.findAndCountAll({
//       where: {
//         userId: req.param.userId
//       }
//     });
    
//     res.status(200).json(count);
//   } catch (error) {
//     console.error('Error fetching number of likes:', error);
//     res.status(500).json({ error: 'Unable to fetch number of likes' });
//   }
// }

const updateLikeStatus = async (req, res) => {
  try {
    const { isLiked, userId, reviewId } = req.body;
    const likeExisted = await UserReviewLike.findOne({
        where: { userId, reviewId }
    });
    if(likeExisted) {
      await UserReviewLike.update({ isLiked },{
        where: { userId, reviewId }
      });
      res.status(200).json({ message: "isLiked got updated!" });
    }
    else {
      await UserReviewLike.create({
        isLiked: true,
        userId,
        reviewId
      });
      res.status(201).json({ message: "isLiked is created!" });
    }
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ error: 'Unable to update isLiked' });
  }
}

module.exports = {
    updateLikeStatus,
}