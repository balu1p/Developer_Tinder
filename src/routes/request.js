const express = require('express');
const { userAuth } = require('../middlewares/Auth');
const requestRouter = express.Router();

requestRouter.post('/sentConnection', userAuth, async (req, res)=> {
    try {
      const user = req.user;
      res.status(200).json({
        data: user.firstName,
        message: `send connection by ${user.firstName}`,
      })
    } catch (error) {
      res.status(400).send("Error :"+ error.message);
    }
  })

  module.exports = requestRouter;