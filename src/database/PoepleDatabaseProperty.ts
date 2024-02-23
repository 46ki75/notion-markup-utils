// @see https://developers.notion.com/reference/property-object#people

export interface PoepleDatabasePropertyResponse {
  id: string
  name: string
  type: 'people'
  people: Record<string, unknown>
}

export class PoepleDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'people'
  public readonly people: Record<string, unknown>

  constructor(poepleDatabasePropertyResponse: PoepleDatabasePropertyResponse) {
    this.id = poepleDatabasePropertyResponse.id
    this.name = poepleDatabasePropertyResponse.name
    this.type = poepleDatabasePropertyResponse.type
    this.people = poepleDatabasePropertyResponse.people
  }
}
