/**
 * @see https://developers.notion.com/reference/parent-object
 *
 * Represents the parent of a Notion object.
 */

export interface ParentResponse {
  type: 'database_id' | 'page_id' | 'workspace' | 'block_id'
  database_id?: string
  page_id?: string
  workspace?: boolean
  block_id?: string
}

export class Parent {
  public type: 'database_id' | 'page_id' | 'workspace' | 'block_id'
  public database_id?: string
  public page_id?: string
  public workspace?: boolean
  public block_id?: string

  constructor(parentResponse: ParentResponse) {
    this.type = parentResponse.type
    switch (this.type) {
      case 'database_id':
        this.database_id = (
          parentResponse as DatabaseParentResponse
        ).database_id
        break
      case 'page_id':
        this.page_id = (parentResponse as PageParentResponse).page_id
        break
      case 'workspace':
        this.workspace = (parentResponse as WorkspaceParentResponse).workspace
        break
      case 'block_id':
        this.block_id = (parentResponse as BlockParentResponse).block_id
        break
    }
  }

  toJSON(): ParentResponse {
    switch (this.type) {
      case 'database_id':
        return { type: this.type, database_id: this.database_id }
      case 'page_id':
        return { type: this.type, page_id: this.page_id }
      case 'workspace':
        return { type: this.type, workspace: this.workspace }
      case 'block_id':
        return { type: this.type, block_id: this.block_id }
      default:
        throw new Error('Invalid parent type')
    }
  }
}

export interface DatabaseParentResponse extends ParentResponse {
  database_id: string
}

export interface PageParentResponse extends ParentResponse {
  page_id: string
}

export interface WorkspaceParentResponse extends ParentResponse {
  workspace: boolean
}

export interface BlockParentResponse extends ParentResponse {
  block_id: string
}
