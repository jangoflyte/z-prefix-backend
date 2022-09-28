const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const {
    getAllUsers,
    getAllItems,
    getUserItem
} = require("./controllers/controller");

app.get('/', (req, res) => {
    //res.status(200).send("Welcome to the API");
    res.sendFile(path.join(__dirname, "/database.html"));
});

app.get("/users", (req, res) => {
    getAllUsers()
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
});

app.get("/items", (req, res) => {
  getAllItems()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.get("/useritem", (req, res) => {
  getUserItem()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.get("*", (req, res) => {
  res.status(200).send("Not a valid endpoint");
});

module.exports = app;