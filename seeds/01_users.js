/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()
  await knex("user_table").insert([
    {
      first_name: "john",
      last_name: "doe",
      username: "johndoe123",
      passwordHash: "password",
    },
    {
      first_name: "jane",
      last_name: "doe",
      username: "janedoe456",
      passwordHash: "dummy",
    },
  ]);
};
