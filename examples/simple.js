const bunyan = require('bunyan')
const bunyanSqlStream = require('../')

// create a bunyan-sql-stream instance
const stream = bunyanSqlStream({
  client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'password',
		database: 'db'
	},
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
