// @see https://developers.notion.com/reference/page-property-values#select

import { type ColorFG } from '../other'

export interface SelectPagePropertyResponse {
  id: string
  type: 'select'
  select: {
    id: string
    name: string
    color: ColorFG
  } | null
}

export type SelectPagePropertyResponseSimplified = {
  name: string
  color: ColorFG
} | null

export class SelectPageProperty {
  public readonly id: string
  public readonly type = 'select'
  public readonly select: {
    id: string
    name: string
    color: ColorFG
  } | null

  constructor(selectPagePropertyResponse: SelectPagePropertyResponse) {
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

  simplify(): SelectPagePropertyResponseSimplified {
    if (this.select != null)
      return { name: this.select.name, color: this.select.color }
    return null
  }
}
