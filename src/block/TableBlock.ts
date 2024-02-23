// @see https://developers.notion.com/reference/block#table
import { type BlockClient } from '../client/BlockClient'
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

  private readonly notion: BlockClient

  constructor(tableBlockResponse: TableBlockResponse, notion: BlockClient) {
    super(tableBlockResponse, notion)
    this.table = { ...tableBlockResponse.table }
    this.notion = notion
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.children(this.id)
    const HTML = await data.toHTML()
    return `<table class='notion-table'>${HTML}</table>`
  }
}
