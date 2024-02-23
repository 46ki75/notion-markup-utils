// @see https://developers.notion.com/reference/property-object#status

import { type ColorFG } from '../other'

export interface StatusDatabasePropertyResponse {
  id: string
  name: string
  type: 'status'
  status: {
    options: Array<{
      id: string
      name: string
      color: ColorFG
    }>
    groups: Array<{
      id: string
      name: string
      color: ColorFG
      option_ids: string[]
    }>
  }
}

export class StatusDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'status'
  public readonly status: {
    options: Array<{
      id: string
      name: string
      color: ColorFG
    }>
    groups: Array<{
      id: string
      name: string
      color: ColorFG
      option_ids: string[]
    }>
  }

  constructor(statusDatabasePropertyResponse: StatusDatabasePropertyResponse) {
    this.id = statusDatabasePropertyResponse.id
    this.name = statusDatabasePropertyResponse.name
    this.type = statusDatabasePropertyResponse.type
    this.status = statusDatabasePropertyResponse.status
  }
}
