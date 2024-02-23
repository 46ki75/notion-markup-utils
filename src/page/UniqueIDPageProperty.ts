// @see https://developers.notion.com/reference/page-property-values#unique-id

export interface UniqueIDPagePropertyResponse {
  id: string
  type: 'unique_id'
  unique_id: {
    number: number
    prefix: string
  }
}

export type UniqueIDPagePropertyResponseSimplified = string

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

  toJSON(): UniqueIDPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      unique_id: this.unique_id
    }
  }

  simplify(): UniqueIDPagePropertyResponseSimplified {
    return this.unique_id.prefix != null
      ? `${this.unique_id.prefix}-${String(this.unique_id.number)}`
      : String(this.unique_id.number)
  }
}
