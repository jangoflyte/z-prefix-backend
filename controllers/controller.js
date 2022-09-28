const knex = require("./dbConnection");

function getAllUsers() {
    return knex.select('*').from('user_table')
}

function getAllItems() {
  return knex.select("*").from("items_table");
}

//select * from user_table join items_table on user_table.id = user_id;
function getUserItem() {
  return knex.select("*").from("user_table")
  .join("items_table", "user_table.id", "=", "user_id");
}

module.exports = {
    getAllUsers,
    getAllItems,
    getUserItem
}