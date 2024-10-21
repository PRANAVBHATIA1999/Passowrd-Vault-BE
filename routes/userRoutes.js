const express = require('express');
const { getUsers, registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);
router.post('/login', loginUser)

module.exports = router;
