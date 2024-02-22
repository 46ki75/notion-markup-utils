// @see https://developers.notion.com/reference/page-property-values#relation

export interface RelationPagePropertyResponse {
  id: string
  type: 'relation'
  relation: Array<{
    id: string
  }>
  has_more: boolean
}

export class RelationPageProperty {
  private readonly id: string
  private readonly type = 'relation'
  private readonly relation: Array<{
    id: string
  }>

  private readonly has_more: boolean

  constructor(relationPagePropertyResponse: RelationPagePropertyResponse) {
    this.id = relationPagePropertyResponse.id
    this.relation = relationPagePropertyResponse.relation
    this.has_more = relationPagePropertyResponse.has_more
  }
}
