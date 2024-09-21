/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
        table.increments('id').primary();
        table.string('project_name').notNullable();
        table.string('stack').notNullable();
        table.string('description').notNullable();
        table.boolean('is_active').defaultTo(1);
        table.integer('created_by').nullable();
        table.integer('updated_by').nullable();
        table.timestamps(true, true);

        table.unique(['project_name', 'created_by']);
        table.index(['id','project_name']);
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
