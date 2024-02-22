// @see https://developers.notion.com/reference/page-property-values#multi-select

import { type ColorFG } from '../other'

export interface MultiSelectPagePropertyResponse {
  id: string
  name: string
  type: 'multi_select'
  multi_select: {
    options: Array<{
      id: string
      name: string
      color: ColorFG
    }>
  }
}

export class MultiSelectPageProperty {
  private readonly id: string
  private readonly name: string
  private readonly type = 'multi_select'
  private readonly multi_select: {
    options: Array<{
      id: string
      name: string
      color: ColorFG
    }>
  }

  constructor(
    multiSelectPagePropertyResponse: MultiSelectPagePropertyResponse
  ) {
    this.id = multiSelectPagePropertyResponse.id
    this.name = multiSelectPagePropertyResponse.name
    this.multi_select = multiSelectPagePropertyResponse.multi_select
  }
}
