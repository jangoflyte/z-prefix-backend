const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const saltRounds = 10; 
const { hash, compare } = bcrypt;

const {
  getAllUsers,
  getAllUsersById,
  getAllItems,
  getAllItemsById,
  getUserItem,
  getUserItemById,
  createUser,
  getPasswordHashForUser,
  createItem,
  updateItem,
  deleteItem,
} = require("./controllers/controller");

console.log(`NODE ENVIRONMENT PER HEROKU`, process.env.NODE_ENV);

app.get('/', (req, res) => {
    //res.status(200).send("Welcome to the API");
    res.sendFile(path.join(__dirname, "/database.html"));
});

app.get("/users", (req, res) => {
    getAllUsers()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
});

app.get("/users/:id", (req, res) => {
  let { id } = req.params;
  getAllUsersById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/items", (req, res) => {
  getAllItems()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/items/:id", (req, res) => {
  let { id } = req.params;
  getAllItemsById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/useritem", (req, res) => {
  getUserItem()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/useritem/:id", (req, res) => {
  let {id} = req.params;
  getUserItemById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).send(err));
});

app.post("/create", (req, res) => {
  // make a new user account based on credentials coming in
  let { body } = req;
  let { username, password } = body;

  // hash the password
  hash(password, saltRounds)
    .then((hashedPass) => {
      // then insert the record into the DB and return a success message
      console.log(`What the password actually is:`, password);
      console.log(`What gets stored in the DB:`, hashedPass);
      createUser(username, hashedPass)
        .then((data) => res.status(201).json("USER CREATED"))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/login", (req, res) => {
  // verify if a user has entered the right password for their existing account
  let { body } = req;
  let { username, password } = body;

  getPasswordHashForUser(username)
    .then((hashedPass) => {
      // check the entered pass against the hashed one using bcrypt
      console.log(`What the user entered on login:`, password);
      console.log(`What the db has stored for that user:`, hashedPass);
      // look up the hashed password for that user
      compare(password, hashedPass)
        // return a succeed or fail message, depending on the password being right
        .then((isMatch) => {
          if (isMatch) res.status(202).json("PASSWORDS MATCH");
          else res.status(401).json("NO MATCH");
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json("Unrecognized Username"));
});

app.post("/items", (req, res) => {
  let item = req.body;
  createItem(item)
    .then(res.status(201).send({message: `Item ${req.body.item_name} created successfully`}))
    .catch((err) => res.status(500).send(err));
});

app.patch("/items", (req, res) => {
  let item = req.body;
  updateItem(item)
    .then(
      res
        .status(201)
        .send({ message: `Item number ${req.body.id} updated successfully` })
    )
    .catch((err) => res.status(500).send(err));
});

app.delete("/items/:id", (req, res) => {
  let {id} = req.params;
  deleteItem(id)
    .then(
      res
        .status(200)
        .send({ message: `Item deleted successfully` })
    )
    .catch((err) => res.status(500).send(err));
});

app.get("*", (req, res) => {
  res.status(200).send("Not a valid endpoint");
});

module.exports = app;