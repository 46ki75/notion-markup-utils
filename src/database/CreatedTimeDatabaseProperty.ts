// @see https://developers.notion.com/reference/property-object#created-time

export interface CreatedTimeDatabasePropertyResponse {
  id: string
  name: string
  type: 'created_time'
  created_time: Record<string, unknown>
}

export class CreatedTimeDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'created_time'
  public readonly created_time: Record<string, unknown>

  constructor(
    createdTimeDatabasePropertyResponse: CreatedTimeDatabasePropertyResponse
  ) {
    this.id = createdTimeDatabasePropertyResponse.id
    this.name = createdTimeDatabasePropertyResponse.name
    this.type = createdTimeDatabasePropertyResponse.type
    this.created_time = createdTimeDatabasePropertyResponse.created_time
  }

  toJSON(): CreatedTimeDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      created_time: this.created_time
    }
  }
}
