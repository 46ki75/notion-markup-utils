// @see https://developers.notion.com/reference/property-object#created-by

export interface CreatedByDatabasePropertyResponse {
  id: string
  name: string
  type: 'created_by'
  created_by: Record<string, unknown>
}

export class CreatedByDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'created_by'
  public readonly created_by: Record<string, unknown>

  constructor(
    reatedByDatabasePropertyResponse: CreatedByDatabasePropertyResponse
  ) {
    this.id = reatedByDatabasePropertyResponse.id
    this.name = reatedByDatabasePropertyResponse.name
    this.type = reatedByDatabasePropertyResponse.type
    this.created_by = reatedByDatabasePropertyResponse.created_by
  }
}
