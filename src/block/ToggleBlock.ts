// @see https://developers.notion.com/reference/block#toggle-blocks
import { type BlockClient } from '../client/BlockClient'
import { type DeepPartial } from '../utils'
import {
  Block,
  type DeepPartialBlockResponseArray,
  type BlockResponse
} from './Block'
import {
  RichText,
  type RichTextRequestBuilder,
  r,
  type RichTextResponse
} from './RichText'

export interface ToggleBlockResponse extends BlockResponse {
  type: 'toggle'
  toggle: {
    rich_text: RichTextResponse[]
    color: string
    children: BlockResponse[]
  }
}

export class ToggleBlock extends Block {
  public readonly type = 'toggle'
  public readonly toggle: {
    rich_text: RichText[]
    color: string
    children: Block[]
  }

  constructor(
    toggleBlockResponse: ToggleBlockResponse,
    public readonly notion: BlockClient
  ) {
    super(toggleBlockResponse, notion)
    this.toggle = {
      ...toggleBlockResponse.toggle,
      rich_text: toggleBlockResponse.toggle.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      children: toggleBlockResponse.toggle.children?.map(
        (child) => new Block(child, notion)
      )
    }
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.children({ id: this.id })

    const summaryPromises = this.toggle.rich_text.map(
      async (item) => await item.toHTML()
    )
    const summary = await Promise.all(summaryPromises)

    const details = await data.toHTML()

    const HTML = `<details class='notion-toggle-block'><summary class='notion-toggle-block-header'>${summary.join('')}</summary>${details}</details>`
    return HTML
  }
}

/**
 *
 * ## Usage:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [
 *     b.toggle('Toggle Headline Title', [b.paragraph('Toggle content')])
 *   ]
 * })
 * ```
 *
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} text
 * @param {DeepPartialBlockResponseArray} children Array of Notion blocks to be included inside a toggle block
 * @returns {DeepPartial<ToggleBlockResponse>}
 */
export const toggle = (
  text: string | RichTextRequestBuilder[] | RichTextRequestBuilder,
  children?: DeepPartialBlockResponseArray
): DeepPartial<ToggleBlockResponse> => {
  return {
    type: 'toggle',
    toggle: {
      rich_text:
        text != null
          ? Array.isArray(text)
            ? text.map((t) => t.build())
            : typeof text === 'string'
              ? [r(text).build()]
              : [text.build()]
          : [],
      children: children ?? []
    } as any
  }
}
