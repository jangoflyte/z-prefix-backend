/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("items_table", (table) => {
        table.increments("id");
        table.integer("user_id");
        table.foreign("user_id").references("user_table.id")
        table.string("item_name");
        table.string("item_description");
        table.integer("quantity");
        table.timestamps(true, true);
    });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .alterTable("items_table", (table) => {
        table.dropForeign("user_id");
      })
      .then(() => {
        return knex.schema.dropTableIfExists("items_table");
      });
};
