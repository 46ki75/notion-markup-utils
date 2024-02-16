// @see https://developers.notion.com/reference/page-property-values#created-time

export interface CreatedTimePagePropertyResponse {
  id: string
  type: 'created_time'
  created_time: string
}

export class CreatedTimePageProperty {
  private readonly id: string
  private readonly type = 'created_time'
  private readonly created_time: string

  constructor(
    createdTimePagePropertyResponse: CreatedTimePagePropertyResponse
  ) {
    this.id = createdTimePagePropertyResponse.id
    this.created_time = createdTimePagePropertyResponse.created_time
  }
}
