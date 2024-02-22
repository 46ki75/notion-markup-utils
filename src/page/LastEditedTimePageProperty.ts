// @see https://developers.notion.com/reference/page-property-values#last-edited-time

export interface LastEditedTimePagePropertyResponse {
  id: string
  type: 'last_edited_time'
  last_edited_time: string
}

export class LastEditedTimePageProperty {
  private readonly id: string
  private readonly type = 'last_edited_time'
  private readonly last_edited_time: string

  constructor(
    lastEditedTimePagePropertyResponse: LastEditedTimePagePropertyResponse
  ) {
    this.id = lastEditedTimePagePropertyResponse.id
    this.last_edited_time = lastEditedTimePagePropertyResponse.last_edited_time
  }
}
