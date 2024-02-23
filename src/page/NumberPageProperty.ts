// @see https://developers.notion.com/reference/page-property-values#number

export interface NumberPagePropertyResponse {
  id: string
  name: string
  type: 'number'
  number: {
    format: 'number'
  }
}

export type NumberPagePropertyResponseSimplified = string

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

  toJSON(): NumberPagePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      number: {
        format: 'number'
      }
    }
  }

  simplify(): NumberPagePropertyResponseSimplified {
    return this.number.format
  }
}
