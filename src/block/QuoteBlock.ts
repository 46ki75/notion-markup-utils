// @see https://developers.notion.com/reference/block#quote
import { type BlockClient } from '../client/BlockClient'
import { type Color } from '../other'
import { type DeepPartial } from '../utils'
import {
  Block,
  type DeepPartialBlockResponseArray,
  type BlockResponse
} from './Block'
import {
  RichText,
  r,
  type RichTextRequestBuilder,
  type RichTextResponse
} from './RichText'

export interface QuoteBlockResponse extends BlockResponse {
  type: 'quote'
  quote: {
    rich_text: RichTextResponse[]
    color: Color
    children: BlockResponse[]
  }
}

export class QuoteBlock extends Block {
  public readonly type = 'quote'
  public readonly quote: {
    rich_text: RichText[]
    color: Color
    children: Block[]
  }

  constructor(quoteBlockResponse: QuoteBlockResponse, notion: BlockClient) {
    super(quoteBlockResponse, notion)
    this.quote = {
      rich_text: quoteBlockResponse.quote.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      color: quoteBlockResponse.quote.color,
      children: quoteBlockResponse.quote.children?.map(
        (child) => new Block(child, notion)
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.quote.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<blockquote class='notion-quote'>${HTML.join('')}</blockquote>`
  }
}

/**
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.quote('Quote Text', [b.paragraph('Quote content')])]
 * })
 * ```
 *
 * @param text Text of the Quote
 * @param children Array of Notion blocks to be included inside a quote block
 * @returns
 */
export const quote = (
  text: string | RichTextRequestBuilder[] | RichTextRequestBuilder,
  children?: DeepPartialBlockResponseArray
): DeepPartial<QuoteBlockResponse> => {
  return {
    type: 'quote',
    quote: {
      rich_text:
        text != null
          ? Array.isArray(text)
            ? text.map((t) => t.build())
            : typeof text === 'string'
              ? [r(text).build()]
              : [text.build()]
          : [],
      children: children ?? []
    }
  }
}
