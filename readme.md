# bunyan-sql-stream

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage][coveralls-image]][coveralls-url]

This package creates a Bunyan stream that can write to a number of different SQL databases.

Currently, it supports:
- PostgreSQL
- MSSQL
- MySQL
- MariaDB
- SQLite3
- Oracle

The stream maps the default Bunyan log fields to table columns and also stores the entire log message. Depending on your database, it will attempt to store the message in a `json` column type.

## Installation

```bash
npm install --save bunyan-sql-stream
```

## Usage

```js
const logger = bunyan.createLogger({
	name: 'sql stream',
	level: 'info',
	stream: bunyanSqlStream({
    client: 'pg',
  	connection: {
  		host: 'localhost',
  		user: 'postgres',
  		password: 'password',
  		database: 'db'
  	},
  	tableName: 'logs'
  })
})
```

This package uses the same client and connection options as [Knex.js](http://knexjs.org/).

You'll also need to install a database client for each type of database you'll be logging to.

For example, if you're using PostgreSQL:

```bash
npm install --save pg
```

The package should issue an error message that will tell you which module to install once you set the client option.

## Additional Info

This package depends on knex.js and has more dependencies than some other packages. If want to minimize dependencies, you might prefer another module:
- PostgreSQL - [bunyan-postgres-stream](https://github.com/fdesjardins/bunyan-postgres-stream)
- MSSQL - [bunyan-mssql-stream](https://github.com/Vaelek/bunyan-mssql-stream)
- MySQL - [bunyan-mysql-stream](https://github.com/ehattori/bunyan-mysql)

## Contributing

Pull requests welcome.

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/bunyan-sql-stream
[npm-image]: https://img.shields.io/npm/v/bunyan-sql-stream.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/bunyan-sql-stream
[travis-image]: https://img.shields.io/travis/fdesjardins/bunyan-sql-stream.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/bunyan-sql-stream
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/bunyan-sql-stream.svg?style=flat
