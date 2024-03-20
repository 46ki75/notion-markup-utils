// @see https://developers.notion.com/reference/page-property-values#url

import { type DeepPartial } from '../utils'

export interface URLPagePropertyResponse {
  id: string
  type: 'url'

  /**
   * When a value is blank in Notion, it becomes null.
   */
  url: string | null
}

/**
 * When a value is blank in Notion, it becomes null.
 */
export type URLPagePropertyResponseSimplified = string | null

export class URLPageProperty {
  public readonly id: string
  public readonly type = 'url'

  /**
   * When a value is blank in Notion, it becomes null.
   */
  public readonly url: string | null

  constructor(URLPagePropertyResponse: URLPagePropertyResponse) {
    this.id = URLPagePropertyResponse.id
    this.url = URLPagePropertyResponse.url ?? null
  }

  toJSON(): URLPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      url: this.url
    }
  }

  simplify(): URLPagePropertyResponseSimplified {
    return this?.url ?? null
  }
}

/**
 * The URL column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ### Usage
 * ```ts
 * await notion.pages.create({
 *   Name: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     Name: p.title('My Page Title'),
 *     URL: p.url('https://example.com')
 *   }
 * })
 */
export const url = (url: string): DeepPartial<URLPagePropertyResponse> => {
  return {
    type: 'url',
    url
  }
}
