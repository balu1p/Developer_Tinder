const express = require('express');

const app = express();


//Request Handler
app.get("/users/:userId/:name", (req, res)=> {
    // console.log(req.query);
    console.log(req.params)
    res.send({firstname: "balu", lastname: "patil"})
})


app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000");
});
