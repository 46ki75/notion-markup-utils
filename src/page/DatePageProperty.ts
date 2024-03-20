// @see https://developers.notion.com/reference/page-property-values#date

import { type DeepPartial } from '../utils'

export interface DatePagePropertyResponse {
  id: string
  type: 'date'
  date: {
    start: string
    end: string | null
    time_zone: string | null
  } | null
}

/**
 * If the date.start is not set on the Notion side (the cell is blank), `null` is returned instead of an object.
 */
export type DatePagePropertyResponseSimplified = {
  start: string
  end: string | null
  time_zone: string | null
} | null

export class DatePageProperty {
  public readonly id: string
  public readonly type = 'date'
  public readonly date: {
    start: string
    end: string | null
    time_zone: string | null
  } | null

  constructor(datePagePropertyResponse: DatePagePropertyResponse) {
    this.id = datePagePropertyResponse.id
    this.date = datePagePropertyResponse.date
  }

  toJSON(): DatePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      date: this.date
    }
  }

  simplify(): DatePagePropertyResponseSimplified {
    return this.date
  }
}

/**
 * The Date column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ### Usage
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     date: p.date('2024-01-01')
 *   }
 * })
 * ```
 * or
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     date: p.date(new Date('2024-01-01'))
 *   }
 * })
 * ```
 */
export const date = (
  start: string | Date,
  end?: string | Date
): DeepPartial<DatePagePropertyResponse> => {
  return {
    type: 'date',
    date: {
      start: new Date(start).toISOString(),
      end: end != null ? new Date(end).toISOString() : null
    }
  } as any
}
