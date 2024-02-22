// @see https://developers.notion.com/reference/page-property-values#unique-id

export interface UniqueIDPagePropertyResponse {
  id: string
  type: 'unique_id'
  unique_id: {
    number: number
    prefix: string
  }
}

export class UniqueIDPageProperty {
  private readonly id: string
  private readonly type = 'unique_id'
  private readonly unique_id: {
    number: number
    prefix: string
  }

  constructor(uniqueIDPagePropertyResponse: UniqueIDPagePropertyResponse) {
    this.id = uniqueIDPagePropertyResponse.id
    this.unique_id = uniqueIDPagePropertyResponse.unique_id
  }
}
