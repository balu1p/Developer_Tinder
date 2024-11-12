const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

// Middleware to parse JSON
app.use(express.json());

//signup
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, age, gender } = req.body;

  //User instance
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
  });

  try {
    await user.save();
    res.json({
      data: {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
      },
      message: "User Added successfully",
    });
  } catch (error) {
    res.status(200).send("error while adding data" + error.message);
  }
});

//get one user
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send("user not found..!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something wents to wrong...");
  }
});

//get all user

app.get("/feed", async (req, res)=> {
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

connectDB()
  .then(() => {
    console.log("DB connected successfully..!");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB connection rejected>>>", err);
  });
