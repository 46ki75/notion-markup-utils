// @see https://developers.notion.com/reference/page-property-values#last-edited-by

import { User, type UserResponse } from '../other'

export interface LastEditedByPagePropertyResponse {
  id: string
  type: 'last_edited_by'
  last_edited_by: UserResponse
}

export class LastEditedByPageProperty {
  private readonly id: string
  private readonly type = 'last_edited_by'
  private readonly last_edited_by: UserResponse

  constructor(
    lastEditedByPagePropertyResponse: LastEditedByPagePropertyResponse
  ) {
    this.id = lastEditedByPagePropertyResponse.id
    this.last_edited_by = new User(
      lastEditedByPagePropertyResponse.last_edited_by
    )
  }
}
