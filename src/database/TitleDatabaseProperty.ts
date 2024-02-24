// @see https://developers.notion.com/reference/property-object#title

export interface TitleDatabasePropertyResponse {
  id: string
  name: string
  type: 'title'
  title: Record<string, unknown>
}

export class TitleDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'title'
  public readonly title: Record<string, unknown>

  constructor(titleDatabasePropertyResponse: TitleDatabasePropertyResponse) {
    this.id = titleDatabasePropertyResponse.id
    this.name = titleDatabasePropertyResponse.name
    this.type = titleDatabasePropertyResponse.type
    this.title = titleDatabasePropertyResponse.title
  }

  toJSON(): TitleDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      title: this.title
    }
  }
}
