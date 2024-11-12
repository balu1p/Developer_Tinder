const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength:50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    },
    profileImg: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/861/371/png-clipart-silhouette-of-person-silhouette-user-profile-female-man-silhouette-face-animals.png"
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("add validate gender data..!")
            }
        }
    },
    skills: {
        type: [ String ]
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User;