const express = require("express");
const authRouter = express.Router();
const { uploads } = require('../middlewares/Multer.js');
const { handleSignup, handleLogin, handleLogout } = require("../controllers/auth.controller.js");


//signup
authRouter.post("/signup", uploads.single('profileImg'), handleSignup);

//login
authRouter.post("/login", handleLogin);

//logout

authRouter.post("/logout", handleLogout);

module.exports = authRouter;
