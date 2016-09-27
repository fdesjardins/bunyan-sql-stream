const Writable = require('stream').Writable
const knex = require('knex')

class LogStream extends Writable {
  constructor (options) {
    super(options)

    if (options.connection === undefined ||
      options.tableName === undefined) {
      throw new Error('Invalid bunyan-sql-stream configuration')
    }

    if (options.connection.client && options.connection.client.makeKnex) {
      this.db = options.connection
    }

    if (typeof options.connection === 'object') {
      this.connection = options.connection
      this.db = knex({
        client: options.client,
        connection: options.connection
      })
    }

    this.tableName = options.tableName
  }

  _write (chunk, env, cb) {
    const content = JSON.parse(chunk.toString())
    this.db
      .insert({
        name: content.name,
        level: content.level,
        hostname: content.hostname,
        msg: content.msg,
        pid: content.pid,
        time: content.time,
        content: JSON.stringify(content)
      })
      .into(this.tableName)
      .asCallback(cb)
  }
}

module.exports = (options = {}) => {
  return new LogStream(options)
}
