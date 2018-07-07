import { Model } from 'objection'
import User from './user'

export default class Ticket extends Model {
  // Table name is the only required property.
  static tableName = 'ticket'

  // This object defines the relations to other models.
  static relationMappings = {
    createdBy: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one. We use the file path version
      // here to prevent require loops.
      modelClass: User,
      join: {
        from: 'ticket.createdByUserId',
        to: 'user.id'
      }
    },
    assignedTo: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one. We use the file path version
      // here to prevent require loops.
      modelClass: User,
      join: {
        from: 'ticket.assignedToUserId',
        to: 'user.id'
      }
    },
  }
}