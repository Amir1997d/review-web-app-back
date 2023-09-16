const { Review, ReviewTag } = require('../models/reviewModel');
const { Tag } = require('../models/tagModel');

const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Unable to fetch tags' });
  }
}

const getTagsByReviewId = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      where: {
        reviewId: req.params.reviewId
      },
      include: Review
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Unable to fetch tags' });
  }
}

const addTags = async (req, res) => {
  try {
    const { tagsArray, reviewId } = req.body;
    tagsArray.forEach(async (name) => {
        await Tag.create({
            name,
            reviewId
        });
        res.status(201).json({ message: "tag is added!" });
    });
  } catch (error) {
    console.error('Error adding tag:', error);
    res.status(500).json({ error: 'Unable to add tag' });
  }
}

module.exports = {
    getTags,
    getTagsByReviewId,
    addTags,
}