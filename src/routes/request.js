const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const requestRouter = express.Router();
const { interestedAndIgnoredStatus, acceptedAndRejectedStatus } = require("../controllers/request.controller");

requestRouter.post("/request/:status/:toUserId", userAuth, interestedAndIgnoredStatus);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  acceptedAndRejectedStatus
);

module.exports = requestRouter;
