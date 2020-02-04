const express = require('express')

const app = express()

const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello Paul!'));

app.get("/dockers", (req, res) => {

    res.send("hello from docker");

});

app.get('/nodemon', (req, res) => {
    res.send("Inventory service")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))