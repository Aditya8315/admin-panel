const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect,admin,getUsers)
  .post(protect, admin, createUser);

router.route('/:id')
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
