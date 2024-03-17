// @see https://developers.notion.com/reference/block#quote
import { type BlockClient } from '../client/BlockClient'
import { type Color } from '../other'
import { type BlockRequest } from '../page'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

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

export interface QuoteBlockRequest {
  type: 'quote'
  quote: {
    rich_text: RichTextResponse[]
    color?: Color
    children: BlockRequest[]
  }
}

export class QuoteBlockRequestBuilder {
  public readonly type = 'quote'
  public readonly quote: {
    rich_text: RichText[]
    color?: Color
    children: BlockRequest[]
  }

  constructor(richText?: RichTextResponse[] | RichTextResponse) {
    this.quote = {
      rich_text:
        richText != null
          ? Array.isArray(richText)
            ? richText.map((text) => new RichText(text))
            : [new RichText(richText)]
          : [],
      color: 'default',
      children: []
    }
  }

  public children(block: BlockRequest | BlockRequest[]): this {
    if (Array.isArray(block)) {
      this.quote.children = block
    } else {
      this.quote.children = [block]
    }
    return this
  }

  public color(color: Color): this {
    this.quote.color = color
    return this
  }

  public build(): QuoteBlockRequest {
    return {
      type: this.type,
      quote: {
        rich_text: this.quote.rich_text.map((text) => text.toJSON()),
        color: this.quote.color,
        children: this.quote.children
      }
    }
  }
}
