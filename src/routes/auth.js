
const User = require('../models/User.js');
const { validateSignup } = require('../utils/validation.js');
const express = require('express');
const authRouter = express.Router();


//signup
authRouter.post("/signup", async (req, res) => {
    try {
      const { firstName, lastName, password, email } = req.body;
      //validation
      validateSignup(req);
      //encrypt password
      // const hashPassword =  await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        password,
        email
      });
  
      await user.save();
      res.send("user added successfully..");
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  });
  
  //login
  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email: email });
      if(!user) {
        throw new Error("Invalid credentials");
      }
      
      const isPassword = await user.isPasswordCorrect(password);
      if(isPassword) {
        const token = await user.getJWT();
        res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
        res.send("user login successfully..");
      } else {
        throw new Error("Invalid credentials");
      }
      
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  });

  //logout

  authRouter.post("/logout", async (req, res) => {
    try {
      res.cookie("token", null, { expires: new Date(Date.now() + 900000), httpOnly: true });
      res.send("user logout successfully..");
    } catch (error) {
      res.status(400).send("ERROR "+ error);
    }
  })

  module.exports = authRouter;