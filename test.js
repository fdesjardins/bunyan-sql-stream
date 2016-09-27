/* global describe, it */

const expect = require('chai').expect
const bunyanSqlStream = require('./')

describe('bunyan-sql-stream', () => {
  it('should initialize', () => {
    expect(bunyanSqlStream({
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'db'
      },
      tableName: 'logs'
    })).to.not.be.null
  })
})
