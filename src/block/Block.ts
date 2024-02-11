import { type UserResponse, type ParentResponse, User, Parent } from '../other'

export interface BlockResponse {
  object: 'block'
  id: string
  parent: ParentResponse
  created_time: string
  last_edited_time: string
  created_by: UserResponse
  last_edited_by: UserResponse
  has_children: boolean
  archived: boolean

  type: string
}

export class Block {
  public readonly object = 'block'
  public readonly id: string
  public readonly parent: Parent
  public readonly created_time: string
  public readonly last_edited_time: string
  public readonly created_by: User
  public readonly last_edited_by: User
  public readonly has_children: boolean
  public readonly archived: boolean

  constructor(blockResponse: BlockResponse) {
    this.id = blockResponse.id
    this.parent = new Parent(blockResponse.parent)
    this.created_time = blockResponse.created_time
    this.last_edited_time = blockResponse.last_edited_time
    this.created_by = new User(blockResponse.created_by)
    this.last_edited_by = new User(blockResponse.last_edited_by)
    this.has_children = blockResponse.has_children
    this.archived = blockResponse.archived
  }
}
