import Ticket from '../../models/ticket'
import Tag from '../../models/tag'

export async function tickets (obj, args, { knex }, info) {
  return Ticket.query(knex)
}

export async function createTicket (obj, { input }, { knex }, info) {
  return Ticket.query(knex).insertGraph(input, { relate: true })
}

export async function updateTicket (obj, { id, input }, { knex }, info) {
  return Ticket.query(knex).patchAndFetchById(id, input)
}

export const TicketResolver = {
  async createdBy (ticket, args, { loaders: { users } }, info) {
    return users.load(ticket.createdByUserId)
  },
  async tags (ticket, args, { knex }, info) {
    return Tag.query(knex).joinRelation('tickets').where('tickets.id', ticket.id)
  }
}
