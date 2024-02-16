// @see https://developers.notion.com/reference/page-property-values#created-by
import { type UserResponse } from '../other'

export type CreatedByPagePropertyResponse = UserResponse

export class CreatedByPageProperty {
  public readonly object = 'user'
  public readonly id: string
  public readonly type?: 'person' | 'bot'
  public readonly name?: string
  public readonly avatar_url?: string

  constructor(createdByPagePropertyResponse: CreatedByPagePropertyResponse) {
    this.id = createdByPagePropertyResponse.id
    this.type = createdByPagePropertyResponse.type
    this.name = createdByPagePropertyResponse.name
    this.avatar_url = createdByPagePropertyResponse.avatar_url
  }
}
