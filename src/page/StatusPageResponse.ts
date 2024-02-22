// @see https://developers.notion.com/reference/page-property-values#status

import { type ColorFG } from '../other'

export interface StatusPagePropertyResponse {
  id: string
  type: 'status'
  status: {
    id: string
    name: string
    color: ColorFG
  }
}

export class StatusPageProperty {
  private readonly id: string
  private readonly type = 'status'
  private readonly status: {
    id: string
    name: string
    color: ColorFG
  }

  constructor(statusPageProperty: StatusPagePropertyResponse) {
    this.id = statusPageProperty.id
    this.status = statusPageProperty.status
  }
}
