const knex = require("knex");

const allKnexConfigs = require("../knexfile.js");

const knexConfig = allKnexConfigs[process.env.NODE_ENV || "development"];

const dbConnection = knex(knexConfig);

module.exports = dbConnection;
