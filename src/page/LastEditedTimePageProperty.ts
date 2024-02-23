// @see https://developers.notion.com/reference/page-property-values#last-edited-time

export interface LastEditedTimePagePropertyResponse {
  id: string
  type: 'last_edited_time'
  last_edited_time: string
}

export type LastEditedTimePagePropertyResponseSimplified = string

export class LastEditedTimePageProperty {
  public readonly id: string
  public readonly type = 'last_edited_time'
  public readonly last_edited_time: string

  constructor(
    lastEditedTimePagePropertyResponse: LastEditedTimePagePropertyResponse
  ) {
    this.id = lastEditedTimePagePropertyResponse.id
    this.last_edited_time = lastEditedTimePagePropertyResponse.last_edited_time
  }

  toJSON(): LastEditedTimePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      last_edited_time: this.last_edited_time
    }
  }

  simplify(): LastEditedTimePagePropertyResponseSimplified {
    return this.last_edited_time
  }
}
