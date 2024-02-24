// @see https://developers.notion.com/reference/property-object#url

export interface URLDatabasePropertyResponse {
  id: string
  name: string
  type: 'url'
  url: Record<string, unknown>
}

export class URLDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'url'
  public readonly url: Record<string, unknown>

  constructor(URLDatabasePropertyResponse: URLDatabasePropertyResponse) {
    this.id = URLDatabasePropertyResponse.id
    this.name = URLDatabasePropertyResponse.name
    this.type = URLDatabasePropertyResponse.type
    this.url = URLDatabasePropertyResponse.url
  }

  toJSON(): URLDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      url: this.url
    }
  }
}
