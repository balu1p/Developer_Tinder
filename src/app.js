const express = require('express');

const app = express();


// app.get('/users', rH1, [rH2, rH3] )

app.use("/users", [(req, res, next)=> {
    console.log("request handler 1");
    next();
    // res.send('response..!');
}, (req, res, next)=> {
    console.log("request handler 2");
    // res.send("response2..!")
    next();
},  (req, res)=> {
    console.log("request handler 3");
    res.send("response3..!")
}])


app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000");
});
