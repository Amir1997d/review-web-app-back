const { Group } = require('../models/groupModel');

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Unable to fetch groups' });
  }
}
module.exports = { getAllGroups }