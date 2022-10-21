const express = require('express');
const { logger } = require('../../utils/logger');

const router = express.Router();
const User = require('../../models/User');
const controller = require('./user.controller');
const { addUserValidator, addMoneyValidator, userIdValidator } = require('./user.validator');

// GET ALL USERS
router.get('/', async (req, res) => {
  logger.info('Request for getting all users');
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    logger.error(`Error in getting users ${err.message}`);
    res.status(500).json(err.message);
  }
});

// GET SPECIFIC USER
router.get('/:userId', userIdValidator, async (req, res) => {
  logger.info('Request for get user by userId');
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    logger.error(`Error in get user by userID ${err.message}`);
    res.status(404).json('User not found');
  }
});

// REGISTER A USER
router.post('/', addUserValidator, async (req, res) => {
  logger.info('Request for registering user');
  await controller.addUser(req, res);
});

// ADD MORE MONEY
router.post('/addMoney/:userId', addMoneyValidator, async (req, res) => {
  logger.info('Reuest for add money by user id');
  await controller.addMoney(req, res);
});

// DELETE USER
router.delete('/remove/:userId', userIdValidator, async (req, res) => {
  logger.info('Request for deleting user by user id');
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json(deleteUser);
  } catch (err) {
    logger.error(`Error deleting user ${err.message}`);
    res.status(500).json(err.message);
  }
});

module.exports = router;
