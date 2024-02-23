// @see https://developers.notion.com/reference/page-property-values#relation

export interface RelationPagePropertyResponse {
  id: string
  type: 'relation'
  relation: Array<{
    id: string
  }>
  has_more: boolean
}

export type RelationPagePropertyResponseSimplified = string[]

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

  toJSON(): RelationPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      relation: this.relation,
      has_more: this.has_more
    }
  }

  simplify(): RelationPagePropertyResponseSimplified {
    return this.relation.map((relation) => relation.id)
  }
}
