const express = require("express");

const  { authAdmin, authUser } = require('./middlewares/Auth.js');

const app = express();

app.use("/admin", authAdmin);

app.get("/user", authUser, (req, res)=> {
    // console.log("user auth...");
    res.send("user.....!");
})

app.get("/user/login", (req, res)=> {
    res.send("user login...!");
})

app.get("/admin/getUserData", (req, res) => {
  res.send("all user data successfully fetched...");
});

app.get("/admin/deleteUserData", (req, res) => {
  res.send("all user data successfully deleted...");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
