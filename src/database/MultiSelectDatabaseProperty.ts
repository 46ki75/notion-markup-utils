// @see https://developers.notion.com/reference/property-object#multi-select

import { type ColorFG } from '../other'

export interface MultiSelectDatabasePropertyResponse {
  id: string
  name: string
  type: 'multi_select'
  multi_select: Array<{
    id: string
    name: string
    color: ColorFG
  }>
}

export class MultiSelectDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'multi_select'
  public readonly multi_select: Array<{
    id: string
    name: string
    color: ColorFG
  }>

  constructor(
    multiSelectDatabasePropertyResponse: MultiSelectDatabasePropertyResponse
  ) {
    this.id = multiSelectDatabasePropertyResponse.id
    this.name = multiSelectDatabasePropertyResponse.name
    this.type = multiSelectDatabasePropertyResponse.type
    this.multi_select = multiSelectDatabasePropertyResponse.multi_select
  }

  toJSON(): MultiSelectDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      multi_select: this.multi_select
    }
  }
}
