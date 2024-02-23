// @see https://developers.notion.com/reference/block#table-rows
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface TableRowBlockResponse extends BlockResponse {
  type: 'table_row'
  table_row: {
    cells: RichTextResponse[][]
  }
}

export class TableRowBlock extends Block {
  public readonly type = 'table_row'
  public readonly table_row: {
    cells: RichText[][]
  }

  constructor(
    tableRowBlockResponse: TableRowBlockResponse,
    notion: BlockClient
  ) {
    super(tableRowBlockResponse, notion)
    this.table_row = {
      ...tableRowBlockResponse.table_row,
      cells: tableRowBlockResponse.table_row.cells.map((row) =>
        row.map((item) => new RichText(item) ?? [])
      )
    }
  }

  async toHTML(): Promise<string> {
    let HTML = ''
    for (const row of this.table_row.cells) {
      const HTMLPromises = row.map(async (item) => await item.toHTML())
      const rowHTML = await Promise.all(HTMLPromises)
      HTML += `<td>${rowHTML.join('')}</td>`
    }

    return `<tr>${HTML}</tr>`
  }
}
