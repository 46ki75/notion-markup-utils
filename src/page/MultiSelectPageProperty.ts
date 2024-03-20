// @see https://developers.notion.com/reference/page-property-values#multi-select

import { type ColorFG } from '../other'
import { type DeepPartial } from '../utils'

export interface MultiSelectPagePropertyResponse<T extends string = string> {
  id: string
  name: string
  type: 'multi_select'
  multi_select: Array<{
    id: string
    name: T
    color: ColorFG
  }>
}

export type MultiSelectPagePropertyResponseSimplified<
  T extends string = string
> = Array<{
  name: T
  color: ColorFG
}>

export class MultiSelectPageProperty<T extends string = string> {
  public readonly id: string
  public readonly name: string
  public readonly type = 'multi_select'
  public readonly multi_select: Array<{
    id: string
    name: T
    color: ColorFG
  }>

  constructor(
    multiSelectPagePropertyResponse: MultiSelectPagePropertyResponse<T>
  ) {
    this.id = multiSelectPagePropertyResponse.id
    this.name = multiSelectPagePropertyResponse.name
    this.multi_select = multiSelectPagePropertyResponse.multi_select
  }

  toJSON(): MultiSelectPagePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      multi_select: this.multi_select
    }
  }

  simplify(): MultiSelectPagePropertyResponseSimplified<T> {
    return this.multi_select.length === 0
      ? []
      : this.multi_select.map((select) => {
          return { name: select.name, color: select.color }
        })
  }
}

/**
 * The Multi-Select column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ### Usage
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     multiSelectColumnName: p.multiSelect([{ name: 'Option1' }, { name: 'Option2' }])
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
 *     multiSelectColumnName: p.multiSelect([
 *       { name: 'Option1', color: 'blue' },
 *       { name: 'Option2', color: 'red' }
 *     ])
 *   }
 * })
 * ```
 * @note If an option with the same name already exists, specifying a different color will result in a validation error.
 */
export const multiSelect = <T extends string = string>(
  tags: Array<{ name: T; color?: ColorFG }>
): DeepPartial<MultiSelectPagePropertyResponse<T>> => {
  const results = tags.map((tag) => {
    const result = {
      name: tag.name
    } as any

    if (tag.color != null) {
      Object.assign(result, { color: tag.color })
    }

    return result
  })
  return {
    type: 'multi_select',
    multi_select: results
  }
}
