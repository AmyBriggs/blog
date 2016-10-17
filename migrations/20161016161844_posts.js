exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table){
    table.increments()
    table.string('title')
    table.text('body')
    table.text('img_url')
    table.integer('user_id').references(`users.id`).onDelete(`CASCADE`)
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
}
