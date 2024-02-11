// @see https://developers.notion.com/reference/block#table
import { type NotionClient } from '../Client'
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

  private readonly notion: NotionClient

  constructor(tableBlockResponse: TableBlockResponse, notion: NotionClient) {
    super(tableBlockResponse, notion)
    this.table = { ...tableBlockResponse.table }
    this.notion = notion
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.blocksChildren(this.id)
    const HTML = await data.toHTML()
    return `<table class='notion-table'>${HTML}</table>`
  }
}
