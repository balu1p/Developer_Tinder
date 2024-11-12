const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

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

//delete user 
app.delete("/user", async (req, res) => {
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
app.patch("/user",async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {returnDocument : "after",
      runValidators: true,
    });
    res.status(200).json({
      data: user,
      message: "user updated successfully.."
    })
  }catch (error) {
    res.status(400).send("Failed to add data..!" + error.message);
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
