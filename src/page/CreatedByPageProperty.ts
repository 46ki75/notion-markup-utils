// @see https://developers.notion.com/reference/page-property-values#created-by
import { User, type UserResponseSimplified, type UserResponse } from '../other'

export interface CreatedByPagePropertyResponse {
  id: string
  type: 'created_by'
  created_by: UserResponse
}

export type CreatedByPagePropertyResponseSimplified = UserResponseSimplified

export class CreatedByPageProperty {
  public readonly id: string
  public readonly type = 'created_by'
  public readonly created_by: User

  constructor(createdByPagePropertyResponse: CreatedByPagePropertyResponse) {
    this.id = createdByPagePropertyResponse.id
    this.created_by = new User(createdByPagePropertyResponse.created_by)
  }

  toJSON(): CreatedByPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      created_by: this.created_by.toJSON()
    }
  }

  simplify(): CreatedByPagePropertyResponseSimplified {
    return this.created_by.simplify()
  }
}
