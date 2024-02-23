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

export interface StatusPagePropertyResponseSimplified {
  name: string
  color: ColorFG
}

export class StatusPageProperty {
  public readonly id: string
  public readonly type = 'status'
  public readonly status: {
    id: string
    name: string
    color: ColorFG
  }

  constructor(statusPageProperty: StatusPagePropertyResponse) {
    this.id = statusPageProperty.id
    this.status = statusPageProperty.status
  }

  toJSON(): StatusPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      status: this.status
    }
  }

  simplify(): StatusPagePropertyResponseSimplified {
    return { name: this.status.name, color: this.status.color }
  }
}
