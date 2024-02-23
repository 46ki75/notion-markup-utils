// @see https://developers.notion.com/reference/page-property-values#created-time

export interface CreatedTimePagePropertyResponse {
  id: string
  type: 'created_time'
  created_time: string
}

export type CreatedTimePagePropertyResponseSimplified = string

export class CreatedTimePageProperty {
  public readonly id: string
  public readonly type = 'created_time'
  public readonly created_time: string

  constructor(
    createdTimePagePropertyResponse: CreatedTimePagePropertyResponse
  ) {
    this.id = createdTimePagePropertyResponse.id
    this.created_time = createdTimePagePropertyResponse.created_time
  }

  toJSON(): CreatedTimePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      created_time: this.created_time
    }
  }

  simplify(): CreatedTimePagePropertyResponseSimplified {
    return this.created_time
  }
}
