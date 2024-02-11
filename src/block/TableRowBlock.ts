// @see https://developers.notion.com/reference/block#table-rows
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface TableRowBlockResponse extends BlockResponse {
  type: 'table_row'
  table_row: {
    cells: RichTextResponse[]
  }
}

export class TableRowBlock extends Block {
  public readonly type = 'table_row'
  public readonly table_row: {
    cells: RichText[]
  }

  constructor(tableRowBlockResponse: TableRowBlockResponse) {
    super(tableRowBlockResponse)
    this.table_row = {
      ...tableRowBlockResponse.table_row,
      cells: tableRowBlockResponse.table_row.cells.map(
        (item) => new RichText(item)
      )
    }
  }
}
