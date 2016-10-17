exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comments').insert([
      {body: 'LOL.', post_id: 1, user_id: 6},
      {body: 'How many miles was Longs?', post_id: 3, user_id: 5},
      {body: 'Have a green smoothie.', post_id: 1, user_id: 8},
      {body: 'I want to be able to stand on my hands!', post_id: 4, user_id: 5},
      {body: 'We are all chummy in g32.', post_id: 1, user_id: 8},
      {body: 'Let\'s go for a walk.', post_id: 1, user_id: 6},
      {body: 'You\'re so tall!', post_id: 3, user_id: 6},
      {body: 'Totally.', post_id: 4, user_id: 6},
      {body: 'Awesome job.', post_id: 3, user_id: 8},
    ]),
  ])
}
