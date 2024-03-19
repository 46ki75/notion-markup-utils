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

export const multiSelect = <T extends string = string>(
  tags: Array<{ name: T; color?: ColorFG }>
): DeepPartial<MultiSelectPagePropertyResponse<T>> => {
  const results = tags.map((tag) => {
    const result = {
      name: tag.name
    } as any

    if (tag.color != null) result.multi_select.color = tag.color
    return result
  })
  return {
    type: 'multi_select',
    multi_select: results
  }
}
