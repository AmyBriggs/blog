`use strict`

const knex = require(`./knex`)

module.exports = {
  getUsers() {
    return knex(`users`)
  },
  getUser(id) {
    return knex(`users`)
      .where(`users.id`, id).first()
  },
  createUser(user) {
    return knex(`users`).insert(user)
  },
  updateUser(id, user) {
    return knex(`users`)
      .update(user)
      .where(`posts.id`, id)
  },
  deleteUser(id) {
    return knex(`users`).del()
      .where(`users.id`, id)
  },
  getPosts() {
    return knex(`posts`)
      .join(`users`, `posts.user_id`, `users.id`)
      .select(`posts.id as postId`, `users.id as userId`, `users.img_url as userImage`, `users.first_name as firstName`, `users.last_name as lastName`, `posts.title as title`, `posts.body as postBody`, `posts.img_url as postImage`)
  },
  getPost(id) {
    return knex(`posts`)
      .join(`users`, `posts.user_id`, `users.id`)
      .select(`posts.id as postId`, `users.id as userId`, `users.img_url as userImage`, `users.first_name as firstName`, `users.last_name as lastName`, `posts.title as title`, `posts.body as postBody`, `posts.img_url as postImage`)
      .where(`posts.id`, id.toString()).first()
  },
  createPost(post){
    console.log(`created!`, post);
    return knex(`posts`).insert(post)
  },
  // createPost(post) {
  //   return knex(`posts`)
  //     .insert({
  //       title: req.body.title,
  //       img_url: req.body.img_url,
  //       body: req.body.body
  //     })
  //     console.log(post);
  // },



  updatePost(id, newPost) {
    return knex(`posts`).select()
      .where(`id`, id).first()
      .then(function(post) {
        return knex(`posts`)
          .update({
            title: newPost.title || post.title,
            body: newPost.body || post.body,
            img_url: newPost.img_url || post.img_url,
          }).where(`posts.id`, id)
      })
  },
  deletePost(id) {
    return knex(`posts`).del()
      .where(`posts.id`, id)
  },
  getCommentsByPostId() {
    return knex(`comments`)
      .join(`posts`, `posts.id`, `comments.post_id`)
      .join(`users`, `users.id`, `comments.user_id`)
      .select(`users.first_name as firstName`, `users.last_name as lastName`, `posts.title as title`, `comments.body as commentBody`)

  },
}
