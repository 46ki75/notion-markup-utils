// @see https://developers.notion.com/reference/page-property-values#last-edited-by

import { User, type UserResponseSimplified, type UserResponse } from '../other'

export interface LastEditedByPagePropertyResponse {
  id: string
  type: 'last_edited_by'
  last_edited_by: UserResponse
}

export type LastEditedByPagePropertyResponseSimplified = UserResponseSimplified

export class LastEditedByPageProperty {
  public readonly id: string
  public readonly type = 'last_edited_by'
  public readonly last_edited_by: User

  constructor(
    lastEditedByPagePropertyResponse: LastEditedByPagePropertyResponse
  ) {
    this.id = lastEditedByPagePropertyResponse.id
    this.last_edited_by = new User(
      lastEditedByPagePropertyResponse.last_edited_by
    )
  }

  toJSON(): LastEditedByPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      last_edited_by: this.last_edited_by.toJSON()
    }
  }

  simplify(): LastEditedByPagePropertyResponseSimplified {
    return this.last_edited_by.simplify()
  }
}
