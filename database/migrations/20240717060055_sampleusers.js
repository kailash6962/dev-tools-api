/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sampleusers', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('age').notNullable();
        table.string('mobile').notNullable().unique();
        table.boolean('is_active').defaultTo(1);
        table.integer('created_by').nullable();
        table.integer('updated_by').nullable();
        table.timestamps(true, true);
        table.index(['id','name','mobile']);
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
