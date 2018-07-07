import Ticket from '../../models/ticket'
import User from '../../models/user'
import DataLoader from 'dataloader'

export default {
  Query: {
    tickets: async (obj, args, { knex }, info) => {
      return Ticket.query(knex)
    },
    users: async (obj, args, { knex }, info) => {
      return User.query(knex)
    }
  },
  Mutation: {
    createTicket: async (obj, { input }, { knex }, info) => {
      return Ticket.query(knex).insert(input)
    },
    updateUser: async (obj, { id, input }, { knex }, info) => {
      return User.query(knex).patchAndFetchById(id, input)
    }
  },
  Ticket: {
    createdBy: async (ticket, args, { loaders: { users } }, info) => {
      return users.load(ticket.createdByUserId)
    }
  }
}

async function userResolver (knex, userIds) {
  return User.query(knex).whereIn('id', userIds)
}

export function createLoaders (knex) {
  return {
    users: new DataLoader(async ids => {
      let users = await userResolver(knex, ids)
      console.log('users: ', users)
      return users
    })
  }
}
