import { type BlockClient } from '../client/BlockClient'
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

  constructor(blockResponse: BlockResponse, notion: BlockClient) {
    this.id = blockResponse.id
    this.parent = new Parent(blockResponse.parent)
    this.created_time = blockResponse.created_time
    this.last_edited_time = blockResponse.last_edited_time
    this.created_by = new User(blockResponse.created_by)
    this.last_edited_by = new User(blockResponse.last_edited_by)
    this.has_children = blockResponse.has_children
    this.archived = blockResponse.archived
  }

  async toHTML(): Promise<string> {
    return await new Promise((resolve) => {
      resolve('')
    })
  }

  toJSON(): BlockResponse {
    return {
      object: this.object,
      id: this.id,
      parent: this.parent.toJSON(),
      created_time: this.created_time,
      last_edited_time: this.last_edited_time,
      created_by: this.created_by.toJSON(),
      last_edited_by: this.last_edited_by.toJSON(),
      has_children: this.has_children,
      archived: this.archived,
      type: 'block'
    }
  }
}
