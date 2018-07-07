
exports.seed = knex => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        { id: 1, username: 'bob', name: 'Bob' },
        { id: 2, username: 'alice', name: 'Alice' }
      ])
    })
}
