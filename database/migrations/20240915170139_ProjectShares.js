/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ProjectShares', function(table) {
        table.increments('id').primary();
        table.integer('project_id').notNullable();
        table.integer('user_id').notNullable();
        table.json('permissions').notNullable();
        table.boolean('is_active').defaultTo(1);
        table.integer('created_by').nullable();
        table.integer('updated_by').nullable();
        table.timestamps(true, true);
        table.index(['project_id','user_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
