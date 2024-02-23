// @see https://developers.notion.com/reference/page-property-values#multi-select

import { type ColorFG } from '../other'

export interface MultiSelectPagePropertyResponse {
  id: string
  name: string
  type: 'multi_select'
  multi_select: Array<{
    id: string
    name: string
    color: ColorFG
  }>
}

export type MultiSelectPagePropertyResponseSimplified = Array<{
  name: string
  color: ColorFG
}>

export class MultiSelectPageProperty {
  public readonly id: string
  public readonly name: string
  public readonly type = 'multi_select'
  public readonly multi_select: Array<{
    id: string
    name: string
    color: ColorFG
  }>

  constructor(
    multiSelectPagePropertyResponse: MultiSelectPagePropertyResponse
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

  simplify(): MultiSelectPagePropertyResponseSimplified {
    return this.multi_select.length === 0
      ? []
      : this.multi_select.map((select) => {
          return { name: select.name, color: select.color }
        })
  }
}
