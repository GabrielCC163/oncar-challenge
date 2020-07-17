exports.up = function(knex) {
	return knex.schema.createTable('veiculos', function(table) {
		table.string('id').primary();
		table.string('veiculo').notNullable();
		table.string('marca').notNullable();
		table.integer('ano').unsigned().notNullable();
		table.text('descricao');
		table.boolean('vendido').defaultTo(false);
		table.datetime('created', { precision: 6 }).defaultTo(knex.fn.now(6));
		table.datetime('updated');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('veiculos');
};
