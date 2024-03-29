// @see https://developers.notion.com/reference/block#child-page
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'

export interface ChildPageBlockResponse extends BlockResponse {
  type: 'child_page'
  child_page: {
    title: string
  }
}

export class ChildPageBlock extends Block {
  public readonly type = 'child_page'
  public readonly child_page: {
    title: string
  }

  constructor(
    childPageBlockResponse: ChildPageBlockResponse,
    notion: BlockClient
  ) {
    super(childPageBlockResponse, notion)
    this.child_page = { title: childPageBlockResponse.child_page.title }
  }
}
