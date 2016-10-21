
exports.seed = function(knex) {
    return knex('users').del()
      .then(() => {
          return knex('users').insert([
            {
              user_name: 'Amy',
              first_name: 'Amy',
              last_name: 'Briggs',
              password: 'testtesttest',
              img_url: 'https://lh6.ggpht.com/sw_iT7GZASdAYeiecsZEHJE-EgDhdK2rCWUzZOJS0OFiGpoi9qn8iMH2nuXHgWg2PA=h900',
              bio: 'Aspiring Full-Stack Developer.'
            },
            {
              user_name: 'Lisa',
              first_name: 'Lisa',
              last_name: 'Ma',
              password: 'testtesttest',
              img_url: 'https://s-media-cache-ak0.pinimg.com/236x/0e/3d/f6/0e3df60cabeec611be2872b82db57458.jpg',
              bio: 'Aspiring Full-Stack Developer.'
            },
            {
              user_name: 'Matt',
              first_name: 'Matt',
              last_name: 'Works',
              password: 'testtesttest',
              img_url: 'http://blogs-images.forbes.com/kristintablang/files/2016/02/Uber-Puppies.jpg',
              bio: 'Aspiring Full-Stack Developer.'
            },
            {
              user_name: 'Gordon',
              first_name: 'Gordon',
              last_name: 'Graham',
              password: 'testtesttest',
              img_url: 'https://pbs.twimg.com/profile_images/447374371917922304/P4BzupWu.jpeg',
              bio: 'Aspiring Full-Stack Developer.'
            },
          ])
        })
      }
