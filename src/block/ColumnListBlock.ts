// @see https://developers.notion.com/reference/block#column-list-and-column
import {
  Block,
  type DeepPartialBlockResponseArray,
  type BlockResponse
} from './Block'
import { type BlockClient } from '../client/BlockClient'
import { type DeepPartial } from '../utils'

export interface ColumnListBlockResponse extends BlockResponse {
  type: 'column_list'
  column_list: Record<string, unknown>
}

export class ColumnListBlock extends Block {
  public readonly type = 'column_list'
  public readonly column_list: Record<string, unknown>

  public readonly notion: BlockClient

  constructor(
    columnListBlockResponse: ColumnListBlockResponse,
    notion: BlockClient
  ) {
    super(columnListBlockResponse, notion)
    this.column_list = columnListBlockResponse.column_list
    this.notion = notion
  }

  /**
   * In Notion, a ColumnListBlock contains ColumnBlocks as its children.
   * It is displayed as a FlexBox with evenly spaced columns horizontally.
   *
   *
   * ### Sample HTML Structure:
   * ```html
   * <div class="notion-column-list">
   *   <div class="notion-column">
   *     <a href="d" class="notion-bookmark"
   *       ><img class="notion-bookmark-image" src="example.com" alt="" />
   *       <div class="notion-bookmark-caption">
   *         <div class="notion-bookmark-title">d</div>
   *         <div class="notion-bookmark-description"></div></div
   *     ></a>
   *   </div>
   *   <div class="notion-column">
   *     <a href="d" class="notion-bookmark"
   *       ><img class="notion-bookmark-image" src="example.com" alt="" />
   *       <div class="notion-bookmark-caption">
   *         <div class="notion-bookmark-title">SAMPLE</div>
   *         <div class="notion-bookmark-description"></div></div
   *     ></a>
   *   </div>
   * </div>
   * ```
   *
   * @returns {string} HTML
   */
  async toHTML(): Promise<string> {
    if (this.has_children) {
      const children = []
      const { results } = await this.notion.children({ id: this.id })
      for (const result of results) {
        const html = await this.notion.getHTML({ id: result.id })
        children.push(html)
      }
      const innerHTML = children
        .map((html) => `<div class='notion-column'>${html}</div>`)
        .join('')
      return `<div class='notion-column-list'>${innerHTML}</div>`
    } else {
      return ``
    }
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

// column_list -> column -> normal block

/***
 *
 * ## Usage:
 * The following demonstrates how you can display multiple blocks side by side
 * by passing an array of NotionBlock objects to the `children` property.
 *
 * **Note**: The number of blocks passed to `children` must be two or more.
 *
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [
 *     b.column([
 *       b.paragraph('COLUMN-1'),
 *       b.paragraph('COLUMN-2'),
 *       b.paragraph('COLUMN-3')
 *     ])
 *   ]
 * })
 * ```
 *
 * Although not observed in practical use, it is possible to add up to 100 blocks horizontally.
 */
export const column = (
  children: DeepPartialBlockResponseArray
): DeepPartial<ColumnListBlockResponse> => ({
  type: 'column_list',
  column_list: {
    children: children.map((child) => ({
      type: 'column',
      column: { children: [child] }
    }))
  }
})
