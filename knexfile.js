// Update with your config settings.
require("dotenv").config();

let connectionString = process.env.DATABASE_URL;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    //uncomment below if using on personal workspace
    //connection: 'postgres://postgres:docker@localhost/z_prefix'
    //uncomment below if deploying in docker
    connection: connectionString,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: { connectionString, ssl: { rejectUnauthorized: false } },
  },
};
