// @see https://developers.notion.com/reference/block#table
import { Block, type BlockResponse } from './Block'

export interface TableBlockResponse extends BlockResponse {
  type: 'table'
  table: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
  }
}

export class TableBlock extends Block {
  public readonly type = 'table'
  public readonly table: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
  }

  constructor(tableBlockResponse: TableBlockResponse) {
    super(tableBlockResponse)
    this.table = { ...tableBlockResponse.table }
  }
}
