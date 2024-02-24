// @see https://developers.notion.com/reference/property-object#people

export interface PeopleDatabasePropertyResponse {
  id: string
  name: string
  type: 'people'
  people: Record<string, unknown>
}

export class PeopleDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'people'
  public readonly people: Record<string, unknown>

  constructor(peopleDatabasePropertyResponse: PeopleDatabasePropertyResponse) {
    this.id = peopleDatabasePropertyResponse.id
    this.name = peopleDatabasePropertyResponse.name
    this.type = peopleDatabasePropertyResponse.type
    this.people = peopleDatabasePropertyResponse.people
  }

  toJSON(): PeopleDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      people: this.people
    }
  }
}
