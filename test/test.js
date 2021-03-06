/* global describe, it */

const expect = require('chai').expect
const bunyanSqlStream = require('../')
const knex = require('knex')
const bunyan = require('bunyan')
const config = require('./config')

describe('bunyan-sql-stream', () => {
  it('should initialize', () => {
    expect(bunyanSqlStream({
      client: 'pg',
      connection: config.connection,
      tableName: 'logs'
    })).to.not.be.null
  })

  it('should not initialize without a table name', () => {
    expect(() => bunyanSqlStream({
      client: 'pg',
      connection: config.connection,
    })).to.throw()
  })

  it('should not initialize without a connection configuration', () => {
    expect(() => bunyanSqlStream({
      client: 'pg',
      tableName: 'logs'
    })).to.throw()
  })

  it('should accept a Knex.js instance', () => {
    const db = knex({
      client: 'pg',
      connection: config.connection,
    })
    expect(bunyanSqlStream({
      connection: db,
      tableName: 'logs'
    })).to.not.be.null
  })

  it('should write to a PostgreSQL database', (done) => {
    const db = knex({
      client: 'pg',
      connection: config.connection,
    })

    const stream = bunyanSqlStream({
      connection: db,
      tableName: 'logs'
    })

    const logger = bunyan.createLogger({
      name: 'test logger',
      stream: stream
    })

    const uniqueMessage = `unique message: ${Math.random()}`
    logger.info(uniqueMessage)

    setTimeout(() => {
      stream.end(() => {
        db('logs')
          .first('*')
          .where('msg', '=', uniqueMessage)
          .then(result => {
            expect(result).to.not.be.null
            done()
          })
      })
    })
  })
})
