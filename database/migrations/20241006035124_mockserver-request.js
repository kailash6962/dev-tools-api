/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('MockServerRequest', function(table) {
        table.increments('id').primary();
        table.integer('mock_server_id').notNullable().unsigned()
        table.string('name', 255).nullable();
        table.text('description').nullable();
        table.enu('method', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).nullable();
        table.string('url_slug', 255).nullable();
        table.string('response_type', 50).nullable();
        table.integer('response_code').nullable();
        table.integer('delay').nullable();
        table.text('response').nullable();
        table.boolean('is_active').defaultTo(true);
        table.integer('created_by').unsigned().nullable();
        table.integer('updated_by').unsigned().nullable();
        table.timestamps(true, true);
        table.index(['mock_server_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
