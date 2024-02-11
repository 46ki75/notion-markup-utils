// @see https://developers.notion.com/reference/block#child-page
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

  constructor(childPageBlockResponse: ChildPageBlockResponse) {
    super(childPageBlockResponse)
    this.child_page = { title: childPageBlockResponse.child_page.title }
  }
}
