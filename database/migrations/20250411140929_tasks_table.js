/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('title').checkLength('<=', 255).notNullable();
        table.text('description').notNullable();
        table.datetime('reminder_time').nullable();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.boolean('completed').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());

    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
  
};
