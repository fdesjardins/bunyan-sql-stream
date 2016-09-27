exports.up = knex => {
  return knex
    .schema
    .withSchema('public')
    .createTableIfNotExists('logs', t => {
      t.increments('id').primary()
      t.text('name')
      t.integer('level')
      t.text('hostname')
      t.text('msg')
      t.integer('pid')
      t.timestamp('time')
      t.jsonb('content')
    })
}

exports.down = knex => {
  return knex
    .schema
    .withSchema('public')
    .dropTableIfExists('logs')
}
