const express = require('express')
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "complexpassword",
    database: "Customer"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
})

const app = express()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello Paul!'));

app.get("/dockers", (req, res) => {

    res.send("hello from docker");

});

app.get('/nodemon', (req, res) => {
    res.send("Installed nodemon and shit")
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))