const { validateEditProfile } = require("../utils/validation");

const getProfile = async (req, res)=> {
    try {
      const loggedUser = req.user;
      if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
      res.status(200).json({
        data: loggedUser,
        message: "profile data fetched successfully",
      })
    } catch (error) {
      res.status(400).send("Error :"+ error.message);
    }
  }

  const editProfile = async(req, res) => {
    try {
      const loggedUser = req.user;
      if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
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
  }

  const changeProfilePassword = async(req, res) => {
    try {
      const { password, newPassword } = req.body;
      const loggedUser = req.user;
      if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
      const isPassword = await loggedUser.isPasswordCorrect(password);

      if(!isPassword) {
        throw new Error("Invalid password");
      } 
      loggedUser.password = newPassword;
      await loggedUser.save();
     res.status(200).json({
      data : loggedUser,
      message: "password updated successfully..."
     })
    } catch (error) {
      res.send("ERROR :"+ error.message);
    }
  }

  module.exports = {
    getProfile,
    editProfile,
    changeProfilePassword
  }