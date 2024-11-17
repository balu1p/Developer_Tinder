const express = require('express');
const { userAuth } = require('../middlewares/Auth');
const { validateEditProfile } = require('../utils/validation');
const profileRouter = express.Router();

//get profile by using token
profileRouter.get('/profile/view', userAuth, async (req, res)=> {
    try {
      const user = req.user;
      res.status(200).json({
        data: user,
        message: "profile data fetched successfully",
      })
    } catch (error) {
      res.status(400).send("Error :"+ error.message);
    }
  });

  //edit profile

  profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
    try {
      const loggedUser = req.user;
      await validateEditProfile(req);
    
     Object.keys(req.body).forEach((key) => (
      loggedUser[key] = req.body[key]
     ));
    
     await loggedUser.save();
     res.status(200).json({
      data : loggedUser,
      message: "profile updated successfully..."
     })
    } catch (error) {
      res.send("ERROR :"+ error.message);
    }
  });


  module.exports = profileRouter;