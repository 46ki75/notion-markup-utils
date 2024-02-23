import { Page, type PageResponseSimplified, type PageResponse } from '../page'

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

export type PageListResponseSimplified = PageResponseSimplified[]

export class PageList {
  public readonly object = 'list'
  public readonly type = 'page_or_database'
  public readonly page_or_database: Record<string, unknown>
  public readonly results: Page[]
  public readonly next_cursor: string | null
  public readonly has_more: boolean
  public readonly developer_survey: string
  public readonly request_id: string

  constructor(pageListResponse: PageListResponse) {
    this.page_or_database = pageListResponse.page_or_database
    this.results = pageListResponse.results.map((page) => new Page(page))
    this.next_cursor = pageListResponse.next_cursor
    this.has_more = pageListResponse.has_more
    this.developer_survey = pageListResponse.developer_survey
    this.request_id = pageListResponse.request_id
  }

  simplify(): PageListResponseSimplified {
    return this.results.map((result) => result.simplify())
  }
}
