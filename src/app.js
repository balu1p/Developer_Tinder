const express = require("express");

const app = express();

app.get("/userData", (req, res)=> {
    try {
        throw new Error()
        res.send("userData....")
    } catch (err) {
        console.log(err)
        res.status(500).send("error happen by mistake call the support team...")
    }
});

app.use('/', (err, _, res, next)=> {
    if(err) {
        res.status(500).send("Something goes wrong...");
    }
})

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
