const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status : {
        type : String,
        enum : [ "interested", "ignored", "accepted", "rejected"],
        required: true
    }
});


connectionRequestSchema.index({ fromUserId: 1 }); //ascending order

connectionRequestSchema.pre("save", async function() {
    const connectionUser = this;
    if(connectionUser.fromUserId.equals(connectionUser.toUserId)) {
        throw new Error("Error is toUserId and fromUserId is matches..!");
    }
});

const connectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequest;

