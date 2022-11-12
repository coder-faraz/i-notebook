
const connectToMongo = require("./db");
const cors = require("cors");



connectToMongo();


const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());    //Middleware function required to deal with JSON objects
app.use(cors());        //Middleware to allow my mongodb to listen to my browser call

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));   //creating a CRUD of notes


app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});

