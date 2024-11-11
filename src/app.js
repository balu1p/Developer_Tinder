const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

// Middleware to parse JSON
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, age, gender } = req.body;

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
        data:{
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
      },
    message: "User Added successfully"
    });
  } catch (error) {
    res.status(200).send("error while adding data" + error.message);
  }
});

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
