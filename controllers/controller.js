const knex = require("./dbConnection");

function getAllUsers() {
  return knex.select("*").from("user_table").orderBy("id", "asc");
}

function getAllUsersById(id) {
  return knex
    .select("*")
    .from("user_table")
    .where({ "user_table.id": id })
    .orderBy("id", "asc");
}

function getAllItems() {
  return knex.select("*").from("items_table").orderBy("id", "asc");
}

//select * from items_table where items_table.id=1;
function getAllItemsById(id) {
  return knex
    .select("*")
    .from("items_table")
    .where({ "items_table.id": id })
    .orderBy("id", "asc");
}

//select * from user_table join items_table on user_table.id = user_id;
function getUserItem() {
  return knex
    .select("*")
    .from("user_table")
    .join("items_table", "user_table.id", "=", "user_id")
}

//select * from user_table inner join items_table on user_table.id = user_id where user_table.id=1;
function getUserItemById(id) {
  return knex
    .select("*")
    .from("user_table")
    .join("items_table", "user_table.id", "=", "user_id")
    .where({ "user_table.id": id })
}

function createUser(username, passwordHash) {
  return knex("user_table")
    .insert({ username, passwordHash })
    .then((data) => data);
}

function getPasswordHashForUser(username) {
  return knex("user_table")
    .where({ username })
    .select(`passwordHash`)
    .then((data) => data[0].passwordHash);
}

function createItem(item) {
  return knex("items_table").insert(item);
}

function updateItem(item) {
  return knex("items_table").where({ id: item.id }).update(item);
}

function updateItemByID(id, item) {
  return knex("items_table").where({ id: id }).update(item);
}

function changeItem(item) {
  return knex("items_table").where({ id: item.id }).update(item);
}

function changeItemByID(id, item) {
  return knex("items_table").where({ id: id }).update(item);
}

function deleteItem(id) {
  return knex("items_table").where({id:id}).del();
}

module.exports = {
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
  updateItemByID,
  changeItem,
  changeItemByID,
  deleteItem
};
