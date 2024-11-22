const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");



//envConfig
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', authRouter);


connectDB()
  .then(() => {
    console.log("DB connected successfully..!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection rejected...!", err);
  });
