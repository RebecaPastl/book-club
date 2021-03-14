const express = require('express');
const app = express();

const connection = require('./db/connection');

app.use(express.static('public'));
app.use(express.json());

connection.once('open', ()=>{

    console.log('connected to db');

        const server = app.listen(process.env.PORT, ()=>{
        console.log(`listening on ${process.env.PORT}`);
    });
});

//create a router object that uses a middleware to help store the routs in another file
const router = require("./routes/index.js");
//targeting the middleware for a particular family of endpoints (/api/v1 family)
//it is implied that router.get('/books') already route to /api/books 
app.use("/api/v1", router);