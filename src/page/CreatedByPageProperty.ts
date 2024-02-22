// @see https://developers.notion.com/reference/page-property-values#created-by
import { User, type UserResponse } from '../other'

export interface CreatedByPagePropertyResponse {
  id: string
  type: 'created_by'
  created_by: UserResponse
}

export class CreatedByPageProperty {
  private readonly id: string
  private readonly type = 'created_by'
  private readonly last_edited_by: UserResponse

  constructor(createdByPagePropertyResponse: CreatedByPagePropertyResponse) {
    this.id = createdByPagePropertyResponse.id
    this.last_edited_by = new User(createdByPagePropertyResponse.created_by)
  }
}
