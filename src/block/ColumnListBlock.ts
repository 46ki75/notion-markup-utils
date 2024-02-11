// @see https://developers.notion.com/reference/block#column-list-and-column
import { Block, type BlockResponse } from './Block'

export interface ColumnListBlockResponse extends BlockResponse {
  type: 'column_list'
  column_list: Record<string, unknown>
}

export class ColumnListBlock extends Block {
  public readonly type = 'column_list'
  public readonly column_list: Record<string, unknown>

  constructor(columnListBlockResponse: ColumnListBlockResponse) {
    super(columnListBlockResponse)
    this.column_list = columnListBlockResponse.column_list
  }
}

export interface ColumnBlockResponse extends BlockResponse {
  type: 'column'
  column: Record<string, unknown>
}

export class ColumnBlock extends Block {
  public readonly type = 'column'
  public readonly column: Record<string, unknown>

  constructor(columnBlockResponse: ColumnBlockResponse) {
    super(columnBlockResponse)
    this.column = columnBlockResponse.column
  }
}
