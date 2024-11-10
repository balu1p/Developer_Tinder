const express = require('express');

const app = express();


//Request Handler
app.get('/users', (req, res)=> {
    res.send({firstname: "balu", lastname: "patil"})
})

app.post("/users", (req, res) => {
    res.send("User data save into DB..!");
})

app.delete("/users", (req, res) => {
    res.send("User data delete into DB..!");
})

app.put("/users", (req, res) => {
    res.send("User data updated>> ");
})


<<<<<<< HEAD
=======
app.use("/test",(req, res)=> {
    res.send("Hello from server..!");
})

app.use("/hello",(req, res)=> {
    res.send("Hello Hello hello..!");
})
>>>>>>> b4f9119701600a92f1e039e66effef22955c45d5
app.use("/",(req, res)=> {
    res.send("Hello from Dashboard..!");
})

app.listen(3000, ()=> {
    console.log("Server is successfully listening on port 3000");
});
