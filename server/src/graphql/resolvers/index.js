import { tickets, createTicket, updateTicket, TicketResolver as Ticket } from './ticket'
import { users, createUser, updateUser, userLoader } from './user'
import { tags, createTag, updateTag } from './tag'

export default {
  Query: {
    tickets,
    users,
    tags
  },
  Mutation: {
    createTicket,
    updateTicket,
    createUser,
    updateUser,
    createTag,
    updateTag
  },
  Ticket
}

export function createLoaders (knex) {
  return {
    users: userLoader(knex)
  }
}
