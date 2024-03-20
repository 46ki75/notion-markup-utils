// @see https://developers.notion.com/reference/page-property-values#number

import { type DeepPartial } from '../utils'

export interface NumberPagePropertyResponse {
  id: string
  type: 'number'
  number: number | null
}

export type NumberPagePropertyResponseSimplified = number | null

export class NumberPageProperty {
  public readonly id: string
  public readonly type = 'number'
  public readonly number: number | null

  constructor(numberPagePropertyResponse: NumberPagePropertyResponse) {
    this.id = numberPagePropertyResponse.id
    this.type = numberPagePropertyResponse.type
    this.number = numberPagePropertyResponse.number
  }

  toJSON(): NumberPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      number: this.number
    }
  }

  simplify(): NumberPagePropertyResponseSimplified {
    return this.number
  }
}

/**
 * The Number column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     number: p.number(3.14)
 *   }
 * })
 * ```
 */
export const number = (
  number: number
): DeepPartial<NumberPagePropertyResponse> => {
  return {
    type: 'number',
    number
  }
}
