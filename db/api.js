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
      .fullOuterJoin(`users`, `posts.user_id`, `users.id`)
      .select(`posts.id as postId`, `users.id as userId`, 'users.first_name as firstName',  'users.last_name as lastName', `posts.title as title`, `posts.body as postBody`, `posts.img_url as postImage`)
  },



  getPost(id) {
    return knex(`posts`)
      .fullOuterJoin(`users`, `posts.user_id`, `users.id`)
      .select(`posts.id as postId`, `users.id as userId`, `users.img_url as userImage`, `users.first_name as firstName`, `users.last_name as lastName`, `posts.title as title`, `posts.body as postBody`, `posts.img_url as postImage`)
      .where(`posts.id`, id.toString()).first()
  },


//
//   createPost(post){
//     return knex(`posts`).insert({
//       user_name: post.user_name,
//       title: post.title,
//       img_url: post.img_url,
//       body: post.body
//
//     })
//
// },
  createPost(post) {
    return knex(`posts`)
      .insert({
        user_id: post.user_id,
        title: post.title,
        img_url: post.img_url,
        body: post.body
      })
  },



  updatePost(id, newPost) {
    console.log('here you go', newPost);
    
    return knex(`posts`).select()
      .where(`id`, id).first()
      .then(function(post) {
        return knex(`posts`)
          .update({
            title: newPost.title || post.title,
            body: newPost.body || post.body,
            img_url: newPost.img_url || post.img_url
          }).where(`posts.id`, id)
      })
      console.log('newPost is', newPost);
  },



  deletePost(id) {
    console.log('this is the delete');
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
