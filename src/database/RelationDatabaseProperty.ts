// @see https://developers.notion.com/reference/property-object#relation

export interface RelationDatabasePropertyResponse {
  id: string
  name: string
  type: 'relation'
  relation: {
    database_id: string
    synced_property_name: string
    synced_property_id: string
  }
}

export class RelationDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'relation'
  public readonly relation: {
    database_id: string
    synced_property_name: string
    synced_property_id: string
  }

  constructor(
    relationDatabasePropertyResponse: RelationDatabasePropertyResponse
  ) {
    this.id = relationDatabasePropertyResponse.id
    this.name = relationDatabasePropertyResponse.name
    this.type = relationDatabasePropertyResponse.type
    this.relation = relationDatabasePropertyResponse.relation
  }
}
