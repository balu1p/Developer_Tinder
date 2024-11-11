const mongoose = require('mongoose');
//NNzif12nqTOKmgM7

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://balupatil4815:NNzif12nqTOKmgM7@cluster0.trutu.mongodb.net/devTinder")
}

module.exports = connectDB;