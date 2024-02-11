// @see https://developers.notion.com/reference/block#callout
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'

export interface ChildDatabaseBlockResponse extends BlockResponse {
  type: 'child_database'
  title: string
}

export class ChildDatabaseBlock extends Block {
  public readonly type = 'child_database'
  public readonly title: string
  constructor(
    childDatabaseBlockResponse: ChildDatabaseBlockResponse,
    notion: NotionClient
  ) {
    super(childDatabaseBlockResponse, notion)
    this.title = childDatabaseBlockResponse.title
  }
}
