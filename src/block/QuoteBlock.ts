// @see https://developers.notion.com/reference/block#quote
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface QuoteBlockResponse extends BlockResponse {
  type: 'quote'
  quote: {
    rich_text: RichTextResponse[]
    color: string
    children: BlockResponse[]
  }
}

export class QuoteBlock extends Block {
  public readonly type = 'quote'
  public readonly quote: {
    rich_text: RichText[]
    color: string
    children: Block[]
  }

  constructor(quoteBlockResponse: QuoteBlockResponse, notion: NotionClient) {
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
