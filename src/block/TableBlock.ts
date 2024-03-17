// @see https://developers.notion.com/reference/block#table
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'
import { type RichTextResponse } from './RichText'
import { type TableRowBlockRequest } from './TableRowBlock'

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

  public readonly notion: BlockClient

  constructor(tableBlockResponse: TableBlockResponse, notion: BlockClient) {
    super(tableBlockResponse, notion)
    this.table = { ...tableBlockResponse.table }
    this.notion = notion
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.children({ id: this.id })
    const HTML = await data.toHTML()
    return `<table class='notion-table'>${HTML}</table>`
  }
}

/**
 * ## Usage:
 * ```ts
 * void (async () => {
 *   const notion = new NotionClient()
 *
 *   await notion.pages.create({
 *     parent: { database_id: 'XXXXXXXXXXXXXXXXXXXXXXX' },
 *     properties: {
 *       title: {
 *         title: [new RichTextRequestBuilder('Table Example').build()]
 *       }
 *     },
 *     children: [
 *       // table
 *       new TableBlockRequestBuilder([
 *         new TableRowBlockRequestBuilder([
 *           [new RichTextRequestBuilder('A1').build()],
 *           [new RichTextRequestBuilder('A2').build()],
 *           [new RichTextRequestBuilder('A3').build()]
 *         ]).build(),
 *         new TableRowBlockRequestBuilder([
 *           [new RichTextRequestBuilder('B1').build()],
 *           [new RichTextRequestBuilder('B2').build()],
 *           [new RichTextRequestBuilder('B3').build()]
 *         ]).build()
 *       ]).build()
 *     ]
 *   })
 * })()
 * ```
 */
export interface TableBlockRequest {
  type: 'table'
  table: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
    children: Array<{
      type: 'table_row'
      table_row: {
        cells: RichTextResponse[][]
      }
    }>
  }
}

export class TableBlockRequestBuilder {
  public readonly type = 'table'
  public readonly table: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
    children: Array<{
      type: 'table_row'
      table_row: {
        cells: RichTextResponse[][]
      }
    }>
  }

  constructor(tableRow: TableRowBlockRequest[]) {
    this.table = {
      table_width: tableRow[0].table_row.cells.length,
      has_column_header: true,
      has_row_header: false,
      children: tableRow
    }
  }

  public build(): TableBlockRequest {
    return {
      type: this.type,
      table: this.table
    }
  }
}
