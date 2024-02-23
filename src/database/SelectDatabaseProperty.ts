// @see https://developers.notion.com/reference/property-object#select

import { type ColorFG } from '../other'

export interface SelectDatabasePropertyResponse {
  id: string
  name: string
  type: 'select'
  select: Array<{
    id: string
    name: string
    color: ColorFG
  }>
}

export class SelectDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'select'
  public readonly select: Array<{
    id: string
    name: string
    color: ColorFG
  }>

  constructor(selectDatabasePropertyResponse: SelectDatabasePropertyResponse) {
    this.id = selectDatabasePropertyResponse.id
    this.name = selectDatabasePropertyResponse.name
    this.type = selectDatabasePropertyResponse.type
    this.select = selectDatabasePropertyResponse.select
  }
}
