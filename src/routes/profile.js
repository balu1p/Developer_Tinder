const express = require('express');
const { userAuth } = require('../middlewares/Auth');
const { getProfile, editProfile, changeProfilePassword } = require('../controllers/profile.controller');
const profileRouter = express.Router();

//get profile by using token
profileRouter.get('/profile/view', userAuth, getProfile);

  //edit profile

  profileRouter.patch('/profile/edit', userAuth, editProfile);

  //change password
  profileRouter.patch('/profile/password', userAuth, changeProfilePassword);


  module.exports = profileRouter;