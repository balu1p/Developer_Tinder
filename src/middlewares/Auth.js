const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token is not present");
        }

        const decodedToken = await jwt.verify(token, "DEVTINDER@7777");
        const { _id } = decodedToken;

        const user = await User.findById(_id);

        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("ERROR"+error.message);
    }
}

module.exports = {
    userAuth
}