// @see https://developers.notion.com/reference/page-property-values#select

import { type ColorFG } from '../other'

export interface SelectPagePropertyResponse {
  id: string
  type: 'select'
  select: {
    id: string
    name: string
    color: ColorFG
  }
}

export class SelectPageProperty {
  private readonly id: string
  private readonly type = 'select'
  private readonly select: {
    id: string
    name: string
    color: ColorFG
  }

  constructor(selectPagePropertyResponse: SelectPagePropertyResponse) {
    this.id = selectPagePropertyResponse.id
    this.select = selectPagePropertyResponse.select
  }
}
