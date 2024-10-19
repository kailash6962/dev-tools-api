/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('RequestLogs', function(table) {
        table.increments('id').primary();
        table.integer('mock_request_id').notNullable().unsigned().unique();
        table.integer('request_count').notNullable().unsigned();
        table.string('origin').nullable();
        table.timestamps(true, true);
        table.index(['mock_request_id','origin']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
