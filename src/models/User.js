const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address.");
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password must be strong.");
                }
            },
        },
        phoneNo: {
            type: Number,
        },
        profileImg: {
            type: String,
            default:
                "https://e7.pngegg.com/pngimages/861/371/png-clipart-silhouette-of-person-silhouette-user-profile-female-man-silhouette-face-animals.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid profile image URL.");
                }
            },
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "other"].includes(value)) {
                    throw new Error("Invalid gender value.");
                }
            },
        },
        skills: {
            type: [String],
        },
        about: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEVTINDER@7777", {
        expiresIn: "7d",
    });
    return token;
};

// Check if the input password matches the stored hashed password
userSchema.methods.isPasswordCorrect = async function (inputPassword) {
    const user = this;
    const isPassword = await bcrypt.compare(inputPassword, user.password);
    return isPassword;
};

// Define the User model (avoid OverwriteModelError)
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
