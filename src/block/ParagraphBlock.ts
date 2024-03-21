import { type BlockClient } from '../client/BlockClient'
import {
  Block,
  RichText,
  type BlockResponse,
  type RichTextResponse,
  type RichTextRequestBuilder,
  r
} from '.'
import { type Color } from '../other'
import { type DeepPartial } from '../utils'

export interface ParagraphBlockResponse extends BlockResponse {
  type: 'paragraph'
  paragraph: {
    rich_text: RichTextResponse[]
    color: Color
  }
}

export class ParagraphBlock extends Block {
  public readonly type = 'paragraph'
  public readonly paragraph: {
    rich_text: RichText[]
    color: Color
  }

  constructor(paragraphBlock: ParagraphBlockResponse, notion: BlockClient) {
    super(paragraphBlock, notion)
    this.paragraph = {
      rich_text: paragraphBlock.paragraph.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      color: paragraphBlock.paragraph.color
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.paragraph.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<p class='notion-paragraph'>${HTML.join('')}</p>`
  }
}

/**
 * Create a paragraph.
 *
 * ## Usage:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.paragraph('Notion)]
 * })
 * ```
 *
 * ### With RichText Array
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [
 *     b.paragraph([
 *       r('Notion has changed my life. '),
 *       r('Notion is my Nation.').bold().color('blue')
 *     ])
 *   ]
 * })
 *
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} text Text of the Paragraph
 * @returns {DeepPartial<ParagraphBlockResponse>} Paragraph Block
 */
export const paragraph = (
  text: string | RichTextRequestBuilder[] | RichTextRequestBuilder
): DeepPartial<ParagraphBlockResponse> => {
  return {
    type: 'paragraph',
    paragraph: {
      rich_text:
        text != null
          ? Array.isArray(text)
            ? text.map((t) => t.build())
            : typeof text === 'string'
              ? [r(text).build()]
              : [text.build()]
          : []
    }
  }
}
