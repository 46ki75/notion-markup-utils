// @see https://developers.notion.com/reference/page-property-values#rollup

export interface RollupPagePropertyResponse {
  id: string
  type: 'relation'
  has_more: boolean
}

export type RollupPagePropertyResponseSimplified = boolean

export class RollupPageProperty {
  private readonly id: string
  private readonly type = 'relation'
  private readonly has_more: boolean

  constructor(rollupPagePropertyResponse: RollupPagePropertyResponse) {
    this.id = rollupPagePropertyResponse.id
    this.has_more = rollupPagePropertyResponse.has_more
  }

  toJSON(): RollupPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      has_more: this.has_more
    }
  }

  simplify(): RollupPagePropertyResponseSimplified {
    return this.has_more
  }
}
