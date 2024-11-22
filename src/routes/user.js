const express = require('express');
const { userAuth } = require('../middlewares/Auth');
const { getUserPendingRequest, getUserConnection, getFeedAllUser } = require('../controllers/user.controller');
const userRouter = express.Router();

  //get pending user
  userRouter.get('/user/request/received', userAuth , getUserPendingRequest);

  //user connection
  userRouter.get('/user/connection', userAuth, getUserConnection);

  //feed API 
  userRouter.get('/feed', userAuth, getFeedAllUser);


  module.exports = userRouter;

