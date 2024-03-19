// @see https://developers.notion.com/reference/page-property-values#number

import { type DeepPartial } from '../utils'

export interface NumberPagePropertyResponse {
  id: string
  type: 'number'
  number: number | null
}

export type NumberPagePropertyResponseSimplified = number | null

export class NumberPageProperty {
  public readonly id: string
  public readonly type = 'number'
  public readonly number: number | null

  constructor(numberPagePropertyResponse: NumberPagePropertyResponse) {
    this.id = numberPagePropertyResponse.id
    this.type = numberPagePropertyResponse.type
    this.number = numberPagePropertyResponse.number
  }

  toJSON(): NumberPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      number: this.number
    }
  }

  simplify(): NumberPagePropertyResponseSimplified {
    return this.number
  }
}

export const number = (
  number: number
): DeepPartial<NumberPagePropertyResponse> => {
  return {
    type: 'number',
    number
  }
}
