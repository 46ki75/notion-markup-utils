// @see https://developers.notion.com/reference/page-property-values#number

export interface NumberPagePropertyResponse {
  id: string
  name: string
  type: 'number'
  number: {
    format: 'number'
  }
}

export class NumberPageProperty {
  private readonly id: string
  private readonly name: string
  private readonly type = 'number'
  private readonly number = {
    format: 'number'
  }

  constructor(numberPagePropertyResponse: NumberPagePropertyResponse) {
    this.id = numberPagePropertyResponse.id
    this.name = numberPagePropertyResponse.name
  }
}
