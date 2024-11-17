const express = require('express');
const User = require('../models/User');
const userRouter = express.Router();


//get one user
userRouter.get("/user", async (req, res) => {
    const userId = req.body._id;
    try {
      const user = await User.findById({ _id: userId });
      if (!user) {
        res.status(404).send("user not found..!");
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).send("Something wents to wrong...");
    }
  });


  //delete user 
  userRouter.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
      await User.findByIdAndDelete(userId);
      res.send("user deleted successfully..!")
    }
    catch (error) {
      res.status(400).send("Something went wrong...");
    }
  });
  
  //Update the user
  userRouter.patch("/user/:userId",async (req, res) => {
    const { userId } = req.params;
    const data = req.body;
    const skills = req.body.skills;
  
    try {
      const validators_field = ["firstName", "lastName", "skills", "age", "gender"];
  
      const isValidators = Object.keys(data).every((key)=> {
        return validators_field.includes(key);
      });
  
      if(!isValidators) {
        throw new Error("update not succeed...!")
      }
  
      if(skills.length > 10) {
        throw new Error("Skills must be 1 to 10..")
      }
  
      const user = await User.findByIdAndUpdate(userId, data, {returnDocument : "after",
        runValidators: true,
      });
      res.status(200).json({
        data: user,
        message: "user updated successfully.."
      })
    }catch (error) {
      res.status(400).send("Failed to update data..!" + error.message);
    }
  })
  

  module.exports = userRouter;

