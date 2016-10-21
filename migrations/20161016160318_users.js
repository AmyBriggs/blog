exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments()
    table.string(`user_name`).unique()
    table.string('first_name')
    table.string('last_name')
    table.string('password')
    table.string('img_url')
    table.text('bio')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
