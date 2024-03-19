// @see https://developers.notion.com/reference/page-property-values#relation

export interface RelationPagePropertyResponse {
  id: string
  type: 'relation'

  /**
   * This field refers to the ID of a specific linked page. Additionally,
   * only one page from a database can be referenced per column.
   * However, multiple pages can be linked in one record
   * as long as they are from the same type of database.
   */
  relation: Array<{
    id: string
  }>
  has_more: boolean
}

/**
 * Array of IDs of related Notion pages
 */
export type RelationPagePropertyResponseSimplified = string[]

export class RelationPageProperty {
  public readonly id: string
  public readonly type = 'relation'

  /**
   * This field refers to the ID of a specific linked page. Additionally,
   * only one page from a database can be referenced per column.
   * However, multiple pages can be linked in one record
   * as long as they are from the same type of database.
   */
  public readonly relation: Array<{
    id: string
  }>

  public readonly has_more: boolean

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
