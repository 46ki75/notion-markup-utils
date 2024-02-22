// @see https://developers.notion.com/reference/page-property-values#url

export interface URLPagePropertyResponse {
  id: string
  type: 'url'
  url: string
}

export class URLPageProperty {
  private readonly id: string
  private readonly type = 'url'
  private readonly url: string

  constructor(URLPagePropertyResponse: URLPagePropertyResponse) {
    this.id = URLPagePropertyResponse.id
    this.url = URLPagePropertyResponse.url
  }
}
