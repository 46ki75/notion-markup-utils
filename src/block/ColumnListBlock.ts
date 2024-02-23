// @see https://developers.notion.com/reference/block#column-list-and-column
import { Block, type BlockResponse } from './Block'
import { type BlockClient } from '../client/BlockClient'

export interface ColumnListBlockResponse extends BlockResponse {
  type: 'column_list'
  column_list: Record<string, unknown>
}

export class ColumnListBlock extends Block {
  public readonly type = 'column_list'
  public readonly column_list: Record<string, unknown>

  constructor(
    columnListBlockResponse: ColumnListBlockResponse,
    notion: BlockClient
  ) {
    super(columnListBlockResponse, notion)
    this.column_list = columnListBlockResponse.column_list
  }

  async toHTML(): Promise<string> {
    return `<div class='notion-column'></div>`
  }
}

export interface ColumnBlockResponse extends BlockResponse {
  type: 'column'
  column: Record<string, unknown>
}

export class ColumnBlock extends Block {
  public readonly type = 'column'
  public readonly column: Record<string, unknown>

  constructor(columnBlockResponse: ColumnBlockResponse, notion: BlockClient) {
    super(columnBlockResponse, notion)
    this.column = columnBlockResponse.column
  }
}
