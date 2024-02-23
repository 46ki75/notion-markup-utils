// @see https://developers.notion.com/reference/property-object#last-edited-time

export interface LastEditedTimeDatabasePropertyResponse {
  id: string
  name: string
  type: 'last_edited_time'
  last_edited_time: Record<string, unknown>
}

export class LastEditedTimeDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'last_edited_time'
  public readonly last_edited_time: Record<string, unknown>

  constructor(
    lastEditedTimeDatabasePropertyResponse: LastEditedTimeDatabasePropertyResponse
  ) {
    this.id = lastEditedTimeDatabasePropertyResponse.id
    this.name = lastEditedTimeDatabasePropertyResponse.name
    this.type = lastEditedTimeDatabasePropertyResponse.type
    this.last_edited_time =
      lastEditedTimeDatabasePropertyResponse.last_edited_time
  }
}
