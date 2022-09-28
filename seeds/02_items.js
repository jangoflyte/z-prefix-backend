/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items_table').del()
  await knex("items_table").insert([
    {
      user_id: 1,
      item_name: "pencil",
      item_description: "a yellow Ticonderoga pencil",
      quantity: 5,
    },
    {
      user_id: 1,
      item_name: "eraser",
      item_description: "pink, trapezoid shaped eraser",
      quantity: 2,
    },
    {
      user_id: 2,
      item_name: "sticky notes",
      item_description: "a stack of sticky notes",
      quantity: 3,
    },
    {
      user_id: 2,
      item_name: "vacuum cleaner",
      item_description: "purple Dyson vacuum cleaner",
      quantity: 1,
    },
  ]);
};
