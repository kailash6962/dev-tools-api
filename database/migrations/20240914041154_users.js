/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('company').nullable();
        table.string('email').notNullable();
        table.string('otp').nullable();
        table.boolean('otp_verified').nullable();
        table.string('password').notNullable();
        table.boolean('is_active').defaultTo(0);
        table.timestamps(true, true);
        table.index(['id','email']);
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
