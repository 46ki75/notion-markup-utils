// @see https://developers.notion.com/reference/page-property-values#select

import { type ColorFG } from '../other'

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
