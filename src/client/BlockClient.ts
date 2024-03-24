import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'
import {
  BlockList,
  type BlockResponse,
  type BlockListResponse,
  Block
} from '../block'
import { type BlockRequest } from '../page'
import { type DeepPartial } from '../utils'
import { type DOMJSON } from '../block/DOMJSON'

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

  // TODO: Documentation
  public async append(params: {
    id: string
    children: Array<DeepPartial<BlockResponse>>
  }): Promise<Block[]> {
    const url = `/v1/blocks/${params.id}/children`

    const results: Block[] = []

    // Blocks can only add up to 100 pieces per request
    const childrenArray: BlockRequest[][] = []
    for (let i = 0; i < params.children.length; i += 100) {
      const chunk = params.children.slice(i, i + 100)
      childrenArray.push(chunk)
    }
    for (const children of childrenArray) {
      const { data }: { data: BlockListResponse } = await this.client.patch(
        url,
        {
          children
        }
      )

      data.results.forEach((result) => {
        results.push(new Block(result, this))
      })
    }

    return results
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
    // const turndownService = new TurndownService()
    // const tokens = marked.lexer(turndownService.turndown(rawHtml))
    // const elements = []
    // for (const token of tokens) {
    //   switch (token.type) {
    //     case 'heading': {
    //       if (token.tokens == null) break
    //       const texts: RichTextResponse[] = []
    //       for (const h of token.tokens) {
    //         switch (h.type) {
    //           case 'text':
    //             texts.push(new RichTextRequestBuilder(String(h.text)).build())
    //             break
    //           case 'br':
    //             texts.push(new RichTextRequestBuilder('\n').build())
    //             break
    //           case 'em':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text)).italic().build()
    //             )
    //             break
    //           case 'strong':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text)).bold().build()
    //             )
    //             break
    //           case 'del':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text))
    //                 .strikethrough()
    //                 .build()
    //             )
    //             break
    //           case 'codespan':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text)).code().build()
    //             )
    //             break
    //           case 'link':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text))
    //                 .link(String(h.href))
    //                 .build()
    //             )
    //             break
    //           case 'escape':
    //             texts.push(
    //               new RichTextRequestBuilder(String(h.text)).italic().build()
    //             )
    //             break
    //           case 'image':
    //             elements.push(
    //               new ImageBlockRequestBuilder(String(h.href)).build()
    //             )
    //             break
    //           default:
    //             console.log(h.type)
    //         }
    //       }
    //       elements.push(new Heading2BlockRequestBuilder(texts).build())
    //       break
    //     }
    //     case 'paragraph': {
    //       if (token.tokens == null) break
    //       const texts: RichTextResponse[] = []
    //       for (const p of token.tokens) {
    //         switch (p.type) {
    //           case 'text':
    //             texts.push(new RichTextRequestBuilder(String(p.text)).build())
    //             break
    //           case 'br':
    //             texts.push(new RichTextRequestBuilder('\n').build())
    //             break
    //           case 'em':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text)).italic().build()
    //             )
    //             break
    //           case 'strong':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text)).bold().build()
    //             )
    //             break
    //           case 'del':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text))
    //                 .strikethrough()
    //                 .build()
    //             )
    //             break
    //           case 'codespan':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text)).code().build()
    //             )
    //             break
    //           case 'link':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text))
    //                 .link(String(p.href))
    //                 .build()
    //             )
    //             break
    //           case 'escape':
    //             texts.push(
    //               new RichTextRequestBuilder(String(p.text)).italic().build()
    //             )
    //             break
    //           case 'image':
    //             elements.push(
    //               new ImageBlockRequestBuilder(String(p.href)).build()
    //             )
    //             break
    //           default:
    //         }
    //       }
    //       elements.push(new ParagraphBlockRequestBuilder(texts).build())
    //       break
    //     }
    //     case 'space':
    //       break
    //     case 'hr':
    //       elements.push(new DividerBlockRequestBuilder().build())
    //       break
    //     case 'code': {
    //       elements.push(
    //         new CodeBlockRequestBuilder(
    //           new RichTextRequestBuilder(String(token.text)).build()
    //         )
    //           .language('plain text') // TODO: implement language
    //           .build()
    //       )
    //       break
    //     }
    //     case 'list': {
    //       const listItems = []
    //       for (const item of token.items) {
    //         listItems.push(
    //           new BulletedListItemBlockRequestBuilder(
    //             new RichTextRequestBuilder(String(item.text)).build()
    //           ).build()
    //         )
    //       }
    //       break
    //     }
    //     case 'blockquote': {
    //       if (token.tokens == null) break
    //       const listItems = []
    //       for (const item of token.tokens) {
    //         listItems.push(
    //           new BulletedListItemBlockRequestBuilder(
    //             new RichTextRequestBuilder(String(item.raw)).build()
    //           ).build()
    //         )
    //       }
    //       break
    //     }
    //     case 'table': {
    //       console.dir(token, { depth: 5 })
    //       break
    //     }
    //     default:
    //       console.log(token.type)
    //       break
    //   }
    // }
    // return elements
    return []
  }

  public async getDOMJSON({ id }: { id: string }): Promise<DOMJSON[]> {
    const root: DOMJSON = {
      type: 'root',
      rich_text: [],
      caption: [],
      children: []
    }

    const { results } = await this.children({ id })

    for (const block of results) {
      if (!('type' in block)) continue
      switch (block.type) {
        case 'bookmark': {
          root.children.push({
            type: 'bookmark',
            url: block.bookmark.url,
            rich_text: block.bookmark.caption.map((text) => text.toDOMJSON()),
            caption: [],
            children: []
          })
          break
        }

        case 'breadcrumb': {
          root.children.push({
            type: 'breadcrumb',
            rich_text: [],
            caption: [],
            children: []
          })
          break
        }

        case 'bulleted_list_item': {
          const data: DOMJSON = {
            type: 'bulleted_list_item',
            rich_text: block.bulleted_list_item.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: []
          }
          data.children = await this.getDOMJSON({ id: block.id })
          root.children.push(data)
          break
        }

        case 'callout': {
          const data: DOMJSON = {
            type: 'callout',
            rich_text: block.callout.rich_text.map((text) => text.toDOMJSON()),
            caption: [],
            children: [],
            color: block.callout.color
          }
          root.children.push(data)
          break
        }

        case 'child_database': {
          const data: DOMJSON = {
            type: 'child_database',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'child_page': {
          const data: DOMJSON = {
            type: 'child_page',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'code': {
          const data: DOMJSON = {
            type: 'code',
            rich_text: block.code.rich_text.map((text) => text.toDOMJSON()),
            caption: block.code.caption.map((text) => text.toDOMJSON()),
            children: [],
            language: block.code.language
          }
          root.children.push(data)
          break
        }

        case 'column_list': {
          const data: DOMJSON = {
            type: 'column_list',
            rich_text: [],
            caption: [],
            children: await this.getDOMJSON({ id: block.id })
          }
          root.children.push(data)
          break
        }

        case 'column': {
          const data: DOMJSON = {
            type: 'column',
            rich_text: [],
            caption: [],
            children: await this.getDOMJSON({ id: block.id })
          }
          root.children.push(data)
          break
        }

        case 'divider': {
          const data: DOMJSON = {
            type: 'divider',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'embed': {
          const data: DOMJSON = {
            type: 'embed',
            rich_text: [],
            caption: [],
            children: [],
            url: block.embed.url
          }
          root.children.push(data)
          break
        }

        case 'equation': {
          const data: DOMJSON = {
            type: 'equation',
            rich_text: [],
            caption: [],
            children: [],
            expression: block.equation.expression
          }
          root.children.push(data)
          break
        }

        case 'file': {
          const data: DOMJSON = {
            type: 'file',
            rich_text: [],
            caption: [],
            children: [],
            url: block.file.external?.url ?? block.file.file?.url
          }
          root.children.push(data)
          break
        }

        case 'heading_1': {
          const data: DOMJSON = {
            type: 'heading_1',
            rich_text: block.heading_1.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: block.has_children
              ? await this.getDOMJSON({ id: block.id })
              : []
          }
          root.children.push(data)
          break
        }

        case 'heading_2': {
          const data: DOMJSON = {
            type: 'heading_2',
            rich_text: block.heading_2.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: block.has_children
              ? await this.getDOMJSON({ id: block.id })
              : []
          }
          root.children.push(data)
          break
        }

        case 'heading_3': {
          const data: DOMJSON = {
            type: 'heading_3',
            rich_text: block.heading_3.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: block.has_children
              ? await this.getDOMJSON({ id: block.id })
              : []
          }
          root.children.push(data)
          break
        }

        case 'image': {
          const data: DOMJSON = {
            type: 'image',
            rich_text: [],
            caption: block.image.caption?.map((text) => text.toDOMJSON()) ?? [],
            children: [],
            url: block.image.file?.url ?? block.image.external?.url
          }
          root.children.push(data)
          break
        }

        case 'link_preview': {
          const data: DOMJSON = {
            type: 'link_preview',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'mention': {
          const data: DOMJSON = {
            type: 'mention',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'numbered_list_item': {
          const data: DOMJSON = {
            type: 'numbered_list_item',
            rich_text: block.numbered_list_item.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: []
          }
          data.children = await this.getDOMJSON({ id: block.id })
          root.children.push(data)
          break
        }

        case 'paragraph': {
          const data: DOMJSON = {
            type: 'paragraph',
            rich_text: block.paragraph.rich_text.map((text) =>
              text.toDOMJSON()
            ),
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'pdf': {
          const data: DOMJSON = {
            type: 'pdf',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'quote': {
          const data: DOMJSON = {
            type: 'quote',
            rich_text: block.quote.rich_text.map((text) => text.toDOMJSON()),
            caption: [],
            children: (await this.getDOMJSON({ id: block.id })) ?? []
          }
          root.children.push(data)
          break
        }

        case 'synced_block': {
          const data: DOMJSON = {
            type: 'synced_block',
            rich_text: [],
            caption: [],
            children: (await this.getDOMJSON({ id: block.id })) ?? []
          }
          root.children.push(data)
          break
        }

        case 'table': {
          const row = await this.children({ id: block.id })
          const cells = []
          for (const block of row.results) {
            if ('type' in block && block.type === 'table_row') {
              cells.push(block.table_row.cells)
            }
          }
          const cellsDOM = cells.map((cell) =>
            cell.map((texts) => texts.map((text) => text.toDOMJSON()))
          )

          const data: DOMJSON = {
            type: 'table',
            rich_text: [],
            caption: [],
            children: [],
            table: cellsDOM
          }
          root.children.push(data)
          break
        }

        case 'table_of_contents': {
          const data: DOMJSON = {
            type: 'table_of_contents',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'table_row': {
          const data: DOMJSON = {
            type: 'table_row',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }

        case 'to_do': {
          const data: DOMJSON = {
            type: 'to_do',
            rich_text: block.to_do.rich_text.map((text) => text.toDOMJSON()),
            caption: [],
            children: (await this.getDOMJSON({ id: block.id })) ?? []
          }
          root.children.push(data)
          break
        }

        case 'toggle': {
          const data: DOMJSON = {
            type: 'toggle',
            rich_text: block.toggle.rich_text.map((text) => text.toDOMJSON()),
            caption: [],
            children: (await this.getDOMJSON({ id: block.id })) ?? []
          }
          root.children.push(data)
          break
        }

        case 'video': {
          const data: DOMJSON = {
            type: 'video',
            rich_text: [],
            caption: [],
            children: []
          }
          root.children.push(data)
          break
        }
      }
    }

    return root.children
  }
}
