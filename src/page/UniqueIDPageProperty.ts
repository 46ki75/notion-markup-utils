// @see https://developers.notion.com/reference/page-property-values#unique-id

export interface UniqueIDPagePropertyResponse {
  id: string
  type: 'unique_id'
  unique_id: {
    number: number
    prefix: string
  }
}

/**
 * String combining prefix and ID
 */
export type UniqueIDPagePropertyResponseSimplified = string

export class UniqueIDPageProperty {
  public readonly id: string
  public readonly type = 'unique_id'
  public readonly unique_id: {
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

  /**
   * This method returns a string that combines a prefix and an ID with a `-`.
   * It also appears concatenated with a `-` in Notion.
   */
  simplify(): UniqueIDPagePropertyResponseSimplified {
    return this.unique_id.prefix != null
      ? `${this.unique_id.prefix}-${String(this.unique_id.number)}`
      : String(this.unique_id.number)
  }
}
