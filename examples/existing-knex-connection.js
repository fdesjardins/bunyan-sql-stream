const bunyan = require('bunyan')
const knex = require('knex')
const bunyanSqlStream = require('../')

// create a knex instance
const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'password',
		database: 'db'
	}
})

// create a stream using the existing knex connection
const stream = bunyanPostgresStream({
	connection: db,
	tableName: 'logs'
})

// create the logger
const log = bunyan.createLogger({
	name: 'sql stream',
	level: 'info',
	stream
})

// log an event
log.info('something happened')
