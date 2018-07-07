import Ticket from '../../models/ticket'

export async function tickets (obj, args, { knex }, info) {
  return Ticket.query(knex)
}

export async function createTicket (obj, { input }, { knex }, info) {
  return Ticket.query(knex).insert(input)
}

export async function updateTicket (obj, { id, input }, { knex }, info) {
  return Ticket.query(knex).patchAndFetchById(id, input)
}

export const TicketResolver = {
  createdBy: async (ticket, args, { loaders: { users } }, info) => {
    return users.load(ticket.createdByUserId)
  }
}
