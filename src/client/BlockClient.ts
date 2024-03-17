import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'
import {
  BlockList,
  type BlockListResponse,
  RichTextRequestBuilder,
  type RichTextResponse,
  ImageBlockRequestBuilder,
  ParagraphBlockRequestBuilder,
  Heading2BlockRequestBuilder,
  CodeBlockRequestBuilder,
  DividerBlockRequestBuilder,
  BulletedListItemBlockRequestBuilder
} from '../block'
import { type BlockRequest } from '../page'

import { marked } from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true
})

export class BlockClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  /**
   * ## Retrieve block children
   *
   * @see https://developers.notion.com/reference/get-block-children
   *
   * @param id
   * @param options
   * @returns
   */
  async children(params: {
    id: string
    forceRefresh?: boolean
    recursive?: boolean
    nextCursor?: string
  }): Promise<BlockList> {
    const url =
      `/v1/blocks/${params.id}/children?page_size=100` +
      (params.nextCursor != null ? `&start_cursor=${params.nextCursor}` : '')

    if (!(params?.forceRefresh ?? false)) {
      const cacheRes = this.cache.get<BlockListResponse>(url)
      if (cacheRes != null) return new BlockList(cacheRes, this)
    }

    const res = await this.client.get(url)
    const { data }: { data: BlockListResponse } = res

    if (data.next_cursor != null) {
      const recursiveResult = await this.children({
        id: params.id,
        forceRefresh: params.forceRefresh,
        recursive: true,
        nextCursor: data.next_cursor
      })
      for (const result of recursiveResult.results) {
        data.results.push(result.toJSON())
      }
    }

    this.set(url, data)
    return new BlockList(data, this)
  }

  /**
   * @see https://developers.notion.com/reference/patch-block-children
   * @param params
   */
  public async append(params: {
    id: string
    children: BlockRequest[]
  }): Promise<void> {
    const url = `/v1/blocks/${params.id}/children`

    // Blocks can only add up to 100 pieces per request
    const childrenArray: BlockRequest[][] = []
    for (let i = 0; i < params.children.length; i += 100) {
      const chunk = params.children.slice(i, i + 100)
      childrenArray.push(chunk)
    }
    for (const children of childrenArray) {
      await this.client.patch(url, { children })
    }
  }

  async getHTML(params: {
    id: string
    forceRefresh?: boolean
  }): Promise<string> {
    const blockList = await this.children({
      id: params.id,
      forceRefresh: params.forceRefresh ?? false,
      recursive: true
    })
    const HTML = await blockList.toHTML()
    return HTML
  }

  public HTMLtoNotion(rawHtml: string): BlockRequest[] {
    const tokens = marked.lexer(rawHtml)
    const elements = []
    for (const token of tokens) {
      switch (token.type) {
        case 'heading': {
          if (token.tokens == null) break
          const texts: RichTextResponse[] = []
          for (const h of token.tokens) {
            switch (h.type) {
              case 'text':
                texts.push(new RichTextRequestBuilder(String(h.text)).build())
                break
              case 'br':
                texts.push(new RichTextRequestBuilder('\n').build())
                break
              case 'em':
                texts.push(
                  new RichTextRequestBuilder(String(h.text)).italic().build()
                )
                break
              case 'strong':
                texts.push(
                  new RichTextRequestBuilder(String(h.text)).bold().build()
                )
                break
              case 'del':
                texts.push(
                  new RichTextRequestBuilder(String(h.text))
                    .strikethrough()
                    .build()
                )
                break
              case 'codespan':
                texts.push(
                  new RichTextRequestBuilder(String(h.text)).code().build()
                )
                break
              case 'link':
                texts.push(
                  new RichTextRequestBuilder(String(h.text))
                    .link(String(h.href))
                    .build()
                )
                break
              case 'escape':
                texts.push(
                  new RichTextRequestBuilder(String(h.text)).italic().build()
                )
                break
              case 'image':
                elements.push(
                  new ImageBlockRequestBuilder(String(h.href)).build()
                )
                break
              default:
                console.log(h.type)
            }
          }
          elements.push(new Heading2BlockRequestBuilder(texts).build())
          break
        }
        case 'paragraph': {
          if (token.tokens == null) break
          const texts: RichTextResponse[] = []
          for (const p of token.tokens) {
            switch (p.type) {
              case 'text':
                texts.push(new RichTextRequestBuilder(String(p.text)).build())
                break
              case 'br':
                texts.push(new RichTextRequestBuilder('\n').build())
                break
              case 'em':
                texts.push(
                  new RichTextRequestBuilder(String(p.text)).italic().build()
                )
                break
              case 'strong':
                texts.push(
                  new RichTextRequestBuilder(String(p.text)).bold().build()
                )
                break
              case 'del':
                texts.push(
                  new RichTextRequestBuilder(String(p.text))
                    .strikethrough()
                    .build()
                )
                break
              case 'codespan':
                texts.push(
                  new RichTextRequestBuilder(String(p.text)).code().build()
                )
                break
              case 'link':
                texts.push(
                  new RichTextRequestBuilder(String(p.text))
                    .link(String(p.href))
                    .build()
                )
                break
              case 'escape':
                texts.push(
                  new RichTextRequestBuilder(String(p.text)).italic().build()
                )
                break
              case 'image':
                elements.push(
                  new ImageBlockRequestBuilder(String(p.href)).build()
                )
                break
              default:
            }
          }
          elements.push(new ParagraphBlockRequestBuilder(texts).build())
          break
        }
        case 'space':
          break
        case 'hr':
          elements.push(new DividerBlockRequestBuilder().build())
          break
        case 'code': {
          elements.push(
            new CodeBlockRequestBuilder(
              new RichTextRequestBuilder(String(token.text)).build()
            )
              .language('plain text') // TODO: implement language
              .build()
          )
          break
        }
        case 'list': {
          const listItems = []
          for (const item of token.items) {
            listItems.push(
              new BulletedListItemBlockRequestBuilder(
                new RichTextRequestBuilder(String(item.text)).build()
              ).build()
            )
          }
          break
        }
        case 'blockquote': {
          if (token.tokens == null) break
          const listItems = []
          for (const item of token.tokens) {
            listItems.push(
              new BulletedListItemBlockRequestBuilder(
                new RichTextRequestBuilder(String(item.raw)).build()
              ).build()
            )
          }
          break
        }
        case 'table': {
          console.dir(token, { depth: 5 })
          break
        }
        default:
          console.log(token.type)
          break
      }
    }
    return elements
  }
}
