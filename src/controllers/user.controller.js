const User = require("../models/User");
const connectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = ["firstName", "lastName", "skills", "about", "age", "profileImg" ];

const getUserPendingRequest = async (req, res) => {
    try {
     const loggedUser = req.user;
     if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
     const connectionUser = await connectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
     }).populate("fromUserId", USER_SAFE_DATA)

     res.json({
      data: connectionUser,
      message: "user pending request data fetched successfully..!"
     })
    } catch (error) {
      res.status(400).send("ERROR : " + error);
    }
  };


  const getUserConnection = async(req, res) => {
    try {
      const loggedUser = req.user;
      if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
      const connectionUser = await connectionRequest.find({
        $or: [
          {toUserId: loggedUser._id, status: "accepted"},
          {fromUserId: loggedUser._id, status: "accepted"}
        ]
      }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

      const data = connectionUser.map((row)=> {
        if(row.fromUserId._id.toString() === loggedUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      })

      res.json({
        data,
        message: "connection data fetched successfully..!"
      })

    } catch (error) {
      res.status(400).send("EROOR : " + error);
    }
  }

  const getFeedAllUser = async(req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
     
      limit = limit > 100 ? 100 : limit;
      const skip = (page - 1) * limit;
      const loggedUser = req.user;
     if(!loggedUser) {
        return res.status(401).json({message: "Please login..!"})
     }
      const connectionUser = await connectionRequest.find({
        $or: [
          { fromUserId: loggedUser._id }, { toUserId : loggedUser._id }
        ]
      }).select("fromUserId toUserId");

      const hideConnectionUser = new Set();

      connectionUser.forEach((user)=> {
        hideConnectionUser.add(user.fromUserId.toString());
        hideConnectionUser.add(user.toUserId.toString());
      })

      const data = await User.find({
        $and: [ 
          { _id: { $nin: Array.from(hideConnectionUser)}},
          { _id: { $ne: loggedUser._id}}
         ]
      }).select(USER_SAFE_DATA).skip(skip).limit(limit);

      res.json({
        data,
        message: "data fetched successfully..!"
      })
    } catch (error) {
      res.status(400).json({ meassage: "ERROR : " + error});
    }
  }

  module.exports = {
    getUserPendingRequest,
    getUserConnection,
    getFeedAllUser
  }