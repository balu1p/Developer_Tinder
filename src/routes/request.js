const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    const allowed_fields = ["interested", "ignored"];

    if (!allowed_fields.includes(status)) {
      return res.status(400).json({ message: "status is inavalid..!" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found..!" });
    }

    const existingConnectionRequst = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequst) {
      return res
        .status(400)
        .json({ message: "connection request already exist..!" });
    }

    const connectionRequestModel = new connectionRequest({
      toUserId,
      fromUserId,
      status,
    });

    const data = await connectionRequestModel.save();
    res.status(200).json({
      data,
      message: `request send successfully..`,
    });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedUser = req.user;

      const allowed_status = ["accepted", "rejected"];
      if (!allowed_status.includes(status)) {
        return res.status(400).send("Invalid status..!");
      }

      const connectionUser = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedUser._id,
        status: "interested",
      });

      if (!connectionUser) {
        return res.status(404).send("connection request not found..!");
      }

      connectionUser.status = status;

      const data = await connectionUser.save();
      res.json({
        data,
        message: "connection requested status accepted successfully..!",
      });
    } catch (error) {
      res.status(400).send("Error : " + error);
    }
  }
);

module.exports = requestRouter;
