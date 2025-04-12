/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').checkLength('<=', 255).notNullable().unique();
        table.string('email').checkLength('<=', 255).notNullable().unique();
        table.string('password').checkLength('<=', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  
};
