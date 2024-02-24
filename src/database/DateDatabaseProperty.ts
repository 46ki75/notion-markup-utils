// @see https://developers.notion.com/reference/property-object#date

export interface DateDatabasePropertyResponse {
  id: string
  name: string
  type: 'date'
  date: Record<string, unknown>
}

export class DateDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'date'
  public readonly date: Record<string, unknown>

  constructor(dateDatabasePropertyResponse: DateDatabasePropertyResponse) {
    this.id = dateDatabasePropertyResponse.id
    this.name = dateDatabasePropertyResponse.name
    this.type = dateDatabasePropertyResponse.type
    this.date = dateDatabasePropertyResponse.date
  }

  toJSON(): DateDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      date: this.date
    }
  }
}
