const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, updatePreferredLang } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/preferred-lang', updatePreferredLang);

module.exports = router;