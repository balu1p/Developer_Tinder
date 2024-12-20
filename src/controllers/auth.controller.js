const User = require("../models/User");
const { validateSignup } = require("../utils/validation");

const handleSignup = async (req, res) => {
    try {
      const { firstName, lastName, password, email, phoneNo, age, gender, skills, about } = req.body;
      //validation
      validateSignup(req);

      let profileImgUrl = null;
      if (req.file) {
        const filename = req.file.filename;
        profileImgUrl = `${req.protocol}://${req.get('host')}/public/temp/${filename}`;
      }
  
      const user = new User({
        firstName,
        lastName,
        password,
        email,
        profileImg: profileImgUrl,
        phoneNo,
        age,
        gender,
        skills,
        about
      });
  
      await user.save();
      res.send("user added successfully..");
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  }


  const handleLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
  
      const isPassword = await user.isPasswordCorrect(password);
      if (isPassword) {
        const token = await user.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
        res.send("user login successfully..");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  }

const handleLogout = async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.send("user logout successfully..");
    } catch (error) {
      res.status(400).send("ERROR " + error);
    }
  }

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout
}