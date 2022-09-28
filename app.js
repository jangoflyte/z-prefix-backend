const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const {

} = require("./controllers/controller");

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the API");
});

module.exports = app;