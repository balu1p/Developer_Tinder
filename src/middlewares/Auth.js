const authAdmin = (req, res, next) => {
    const token = "abc";
    const isAuthorisation = token === "abc";
    if(!isAuthorisation) {
        res.status(401).send("Unauthorized admin..");
    } else {
        next();
    }
}

const authUser = (req, res, next) => {
    const token = "xyz";
    const isAuthorisation = token === "xyz";
    if(!isAuthorisation) {
        res.status(401).send("Unauthorized user..");
    } else {
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
}