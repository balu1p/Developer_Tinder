const express = require('express');
const User = require('../models/User');

const feedRouter = express.Router();


//get all user
feedRouter.get("/feed", async (req, res)=> {
    try {
      const users = await User.find({});
      if(!users) {
        res.status(404).send("users not found ..!");
      } else {
        res.send(users);
      }
    } catch (error) {
      res.status(400).send("Something went wrong...");
    }
  })

  module.exports = feedRouter;
  
