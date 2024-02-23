// @see https://developers.notion.com/reference/page-property-values#url

export interface URLPagePropertyResponse {
  id: string
  type: 'url'
  url: string
}

export type URLPagePropertyResponseSimplified = string

export class URLPageProperty {
  public readonly id: string
  public readonly type = 'url'
  public readonly url: string

  constructor(URLPagePropertyResponse: URLPagePropertyResponse) {
    this.id = URLPagePropertyResponse.id
    this.url = URLPagePropertyResponse.url
  }

  toJSON(): URLPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      url: this.url
    }
  }

  simplify(): URLPagePropertyResponseSimplified {
    return this.url
  }
}
