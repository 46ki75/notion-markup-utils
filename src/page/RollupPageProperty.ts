// @see https://developers.notion.com/reference/page-property-values#rollup

export interface RollupPagePropertyResponse {
  id: string
  type: 'relation'
  has_more: boolean
}

export class RollupPageProperty {
  private readonly id: string
  private readonly type = 'relation'
  private readonly has_more: boolean

  constructor(rollupPagePropertyResponse: RollupPagePropertyResponse) {
    this.id = rollupPagePropertyResponse.id
    this.has_more = rollupPagePropertyResponse.has_more
  }
}
