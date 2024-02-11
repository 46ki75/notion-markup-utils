/**
 * @see https://developers.notion.com/reference/parent-object
 *
 * Represents the parent of a Notion object.
 */
export type ParentResponse =
  | DatabaseParentResponse
  | PageParentResponse
  | WorkspaceParentResponse
  | BlockParentResponse

export class Parent {
  public readonly type: 'database_id' | 'page_id' | 'workspace' | 'block_id'

  constructor(parentResponse: ParentResponse) {
    this.type = parentResponse.type
  }
}

export class DatabaseParent extends Parent {
  public readonly database_id: string

  constructor(parentResponse: DatabaseParentResponse) {
    super(parentResponse)
    this.database_id = parentResponse.database_id
  }
}

export class PageParent extends Parent {
  public readonly page_id: string

  constructor(parentResponse: PageParentResponse) {
    super(parentResponse)
    this.page_id = parentResponse.page_id
  }
}

export class WorkspaceParent extends Parent {
  public readonly workspace: boolean

  constructor(parentResponse: WorkspaceParentResponse) {
    super(parentResponse)
    this.workspace = parentResponse.workspace
  }
}

export class BlockParent extends Parent {
  public readonly block_id: string

  constructor(parentResponse: BlockParentResponse) {
    super(parentResponse)
    this.block_id = parentResponse.block_id
  }
}

export interface DatabaseParentResponse {
  type: 'database_id'
  database_id: string
}

export interface PageParentResponse {
  type: 'page_id'
  page_id: string
}

export interface WorkspaceParentResponse {
  type: 'workspace'
  workspace: boolean
}

export interface BlockParentResponse {
  type: 'block_id'
  block_id: string
}
