const { Review } = require('../models/reviewModel');
const { Tag } = require('../models/tagModel');
const { sequelize } = require('../controllers/db');

const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Unable to fetch tags' });
  }
}

const getAndCountTags = async (req, res) => {
  try {
    const rows = await Tag.findAll({
      attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: ['name'],
    });

    const transformedData = rows.map((row) => ({
      value: row.getDataValue('name'),
      count: row.getDataValue('count'),
    }));

    res.json(transformedData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    getAndCountTags,
    getTagsByReviewId,
    addTags,
}