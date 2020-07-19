const { timezone } = require('./config');

module.exports = {
	development: {
		client: 'mysql',
		version: '5.7',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: 'password',
			database: 'oncar',
			charset: 'utf8',
			timezone
		},
		migrations: {
			directory: './src/database/migrations'
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
