// @see https://developers.notion.com/reference/block#table-of-contents
import { type NotionClient } from '../Client'
import { type Color } from '../other'
import { Block, type BlockResponse } from './Block'

export interface TableOfContentsBlockResponse extends BlockResponse {
  type: 'table_of_contents'
  table_of_contents: {
    color: Color
  }
}

export class TableOfContentsBlock extends Block {
  public readonly type = 'table_of_contents'
  public readonly table_of_contents: {
    color: Color
  }

  constructor(
    tableOfContentsBlockResponse: TableOfContentsBlockResponse,
    notion: NotionClient
  ) {
    super(tableOfContentsBlockResponse, notion)
    this.table_of_contents = {
      ...tableOfContentsBlockResponse.table_of_contents
    }
  }
}
