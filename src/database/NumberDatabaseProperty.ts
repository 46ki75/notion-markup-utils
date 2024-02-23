// @see https://developers.notion.com/reference/property-object#number

import { type NumberFormat } from '../other/NumberFormat'

export interface NumberDatabasePropertyResponse {
  id: string
  name: string
  type: 'number'
  number: { format: NumberFormat }
}

export class NumberDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'number'
  public readonly number: { format: NumberFormat }

  constructor(numberDatabasePropertyResponse: NumberDatabasePropertyResponse) {
    this.id = numberDatabasePropertyResponse.id
    this.name = numberDatabasePropertyResponse.name
    this.type = numberDatabasePropertyResponse.type
    this.number = numberDatabasePropertyResponse.number
  }
}
