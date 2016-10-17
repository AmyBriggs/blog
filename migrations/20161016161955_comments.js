exports.up = function(knex) {
  return knex.schema.createTable('comments', function(table){
    table.increments()
    table.string('body')
    table.integer('user_id').references(`users.id`).onDelete(`CASCADE`)
    table.integer('post_id').references(`posts.id`).onDelete(`CASCADE`)
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
}
