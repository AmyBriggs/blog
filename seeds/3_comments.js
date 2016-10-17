exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        body: 'LOL.',
        post_id: 1,
        user_id: 2
      }, {
        body: 'How many miles was Longs?',
        post_id: 3,
        user_id: 1
      }, {
        body: 'Have a green smoothie.',
        post_id: 1,
        user_id: 4
      }, {
        body: 'I want to be able to stand on my hands!',
        post_id: 4,
        user_id: 1
      }, {
        body: 'We are all chummy in g32.',
        post_id: 1,
        user_id: 4
      }, {
        body: 'Let\'s go for a walk.',
        post_id: 1,
        user_id: 2
      }, {
        body: 'You\'re so tall!',
        post_id: 3,
        user_id: 2
      }, {
        body: 'Totally.',
        post_id: 4,
        user_id: 2
      }, {
        body: 'Awesome job.',
        post_id: 3,
        user_id: 4
      } ])
    })
}
