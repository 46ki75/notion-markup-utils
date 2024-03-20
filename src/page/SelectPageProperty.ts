// @see https://developers.notion.com/reference/page-property-values#select

import { type ColorFG } from '../other'
import { type DeepPartial } from '../utils'

export interface SelectPagePropertyResponse<T extends string = string> {
  id: string
  type: 'select'
  select: {
    id: string
    name: T
    color: ColorFG
  } | null
}

export type SelectPagePropertyResponseSimplified<T extends string = string> = {
  name: T
  color: ColorFG
} | null

export class SelectPageProperty<T extends string = string> {
  public readonly id: string
  public readonly type = 'select'
  public readonly select: {
    id: string
    name: T
    color: ColorFG
  } | null

  constructor(selectPagePropertyResponse: SelectPagePropertyResponse<T>) {
    this.id = selectPagePropertyResponse.id
    this.select = selectPagePropertyResponse.select
  }

  toJSON(): SelectPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      select: this.select
    }
  }

  simplify(): SelectPagePropertyResponseSimplified<T> {
    if (this.select != null)
      return { name: this.select.name, color: this.select.color }
    return null
  }
}

/**
 * The Select column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ### Usage
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     selectColumnName: p.select(''In progress'')
 *   }
 * })
 * ```
 * When no color is specified, the behavior is as follows:
 * - If an option with the same name already exists: The color will be automatically matched.
 * - If there is no option with the same name: The color will be determined randomly.
 *
 * ### with Color
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     selectColumnName: p.select('Done', 'blue')
 *   }
 * })
 * ```
 * @note If an option with the same name already exists, specifying a different color will result in a validation error.
 */
export const select = <T extends string = string>(
  name: T,
  color?: ColorFG
): DeepPartial<SelectPagePropertyResponse<T>> => {
  const result = {
    type: 'select',
    select: {
      name
    } as any
  }
  if (color != null) result.select.color = color
  return result as any
}
