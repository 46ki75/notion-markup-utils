import {
  Page,
  type PageResponseSimplified,
  type PageResponse,
  type PageProperty
} from '../page'

export interface PageListResponse {
  object: 'list'
  type: 'page_or_database'
  page_or_database: Record<string, unknown>
  results: PageResponse[]
  next_cursor: string | null
  has_more: boolean
  developer_survey: string
  request_id: string
}

export class PageList<
  T extends Record<string, PageProperty> = Record<string, PageProperty>
> {
  public readonly object = 'list'
  public readonly type = 'page_or_database'
  public readonly page_or_database: Record<string, unknown>
  public readonly results: Array<Page<T>>
  public readonly next_cursor: string | null
  public readonly has_more: boolean
  public readonly developer_survey: string
  public readonly request_id: string

  constructor(pageListResponse: PageListResponse) {
    this.page_or_database = pageListResponse.page_or_database
    this.results = pageListResponse.results.map((page) => new Page(page)) as any
    this.next_cursor = pageListResponse.next_cursor
    this.has_more = pageListResponse.has_more
    this.developer_survey = pageListResponse.developer_survey
    this.request_id = pageListResponse.request_id
  }

  simplify(): Array<PageResponseSimplified<T>> {
    return this.results.map((result) => result.simplify())
  }

  toJSON(): PageListResponse {
    return {
      object: this.object,
      type: this.type,
      page_or_database: this.page_or_database,
      results: this.results.map((page) => page.toJSON()),
      next_cursor: this.next_cursor,
      has_more: this.has_more,
      developer_survey: this.developer_survey,
      request_id: this.request_id
    }
  }
}
