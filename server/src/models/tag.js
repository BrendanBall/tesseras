import { Model } from 'objection'
import Ticket from './ticket'

export default class Tag extends Model {
  static tableName = 'tag'

  static get relationMappings ()  {
    return {
      tickets: {
        relation: Model.ManyToManyRelation,
        modelClass: Ticket,
        join: {
          from: 'tag.id',
          through: {
            from: 'ticketTag.tagId',
            to: 'ticketTag.ticketId'
           },
          to: 'ticket.id'
        }
      }
    }
  }
}