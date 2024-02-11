import {
  Block,
  BookmarkBlock,
  type BookmarkBlockResponse,
  BreadcrumbBlock,
  type BreadcrumbBlockResponse,
  BulletedListItemBlock,
  type BulletedListItemBlockResponse,
  CalloutBlock,
  type CalloutBlockRespose,
  ChildDatabaseBlock,
  type ChildDatabaseBlockResponse,
  ChildPageBlock,
  type ChildPageBlockResponse,
  CodeBlock,
  type CodeBlockResponse,
  ColumnBlock,
  type ColumnBlockResponse,
  ColumnListBlock,
  type ColumnListBlockResponse,
  DividerBlock,
  type DividerBlockResponse,
  EmbedBlock,
  type EmbedBlockResponse,
  EquationBlock,
  type EquationBlockResponse,
  FileBlock,
  type FileBlockResponse,
  Heading1Block,
  type Heading1BlockResponse,
  Heading2Block,
  type Heading2BlockResponse,
  Heading3Block,
  type Heading3BlockResponse,
  ImageBlock,
  type ImageBlockResponse,
  LinkPreviewBlock,
  type LinkPreviewBlockResponse,
  MentionBlock,
  type MentionBlockResponse,
  NumberedListBlock,
  type NumberedListBlockResponse,
  ParagraphBlock,
  type ParagraphBlockResponse,
  PDFBlock,
  type PDFBlockResponse,
  QuoteBlock,
  type QuoteBlockResponse,
  SyncedBlock,
  type SyncedBlockResponse,
  TableBlock,
  type TableBlockResponse,
  TableOfContentsBlock,
  type TableOfContentsBlockResponse,
  TableRowBlock,
  type TableRowBlockResponse,
  ToDoBlock,
  type ToDoBlockResponse,
  ToggleBlock,
  type ToggleBlockResponse,
  VideoBlock,
  type VideoBlockResponse,
  type BlockResponse
} from '.'
import { type NotionClient } from '../Client'

export interface BlockListResponse {
  object: 'list'
  type: 'block'
  results: BlockResponse[]
  next_cursor: null | string
  has_more: boolean
  block: unknown
  request_id: string
}

export class BlockList {
  public readonly object = 'list'
  public readonly type = 'block'
  public readonly results:
    | Block[]
    | BookmarkBlock[]
    | BreadcrumbBlock[]
    | BulletedListItemBlock[]
    | CalloutBlock[]
    | ChildDatabaseBlock[]
    | ChildPageBlock[]
    | CodeBlock[]
    | ColumnListBlock[]
    | DividerBlock[]
    | EmbedBlock[]
    | EquationBlock[]
    | FileBlock[]
    | Heading1Block[]
    | Heading2Block[]
    | Heading3Block[]
    | ImageBlock[]
    | LinkPreviewBlock[]
    | MentionBlock[]
    | NumberedListBlock[]
    | PDFBlock[]
    | ParagraphBlock[]
    | QuoteBlock[]
    | SyncedBlock[]
    | TableBlock[]
    | TableOfContentsBlock[]
    | TableRowBlock[]
    | ToDoBlock[]
    | ToggleBlock[]
    | VideoBlock[]

  public readonly next_cursor: null | string
  public readonly has_more: boolean
  public readonly block: unknown
  public readonly request_id: string

  constructor(blockListResponse: BlockListResponse, notion: NotionClient) {
    this.results = blockListResponse.results.map((blockResponse) => {
      switch (blockResponse.type) {
        case 'bookmark':
          return new BookmarkBlock(
            blockResponse as BookmarkBlockResponse,
            notion
          )

        case 'breadcrumb':
          return new BreadcrumbBlock(
            blockResponse as BreadcrumbBlockResponse,
            notion
          )

        case 'bulleted_list_item':
          return new BulletedListItemBlock(
            blockResponse as BulletedListItemBlockResponse,
            notion
          )

        case 'callout':
          return new CalloutBlock(blockResponse as CalloutBlockRespose, notion)

        case 'child_database':
          return new ChildDatabaseBlock(
            blockResponse as ChildDatabaseBlockResponse,
            notion
          )

        case 'child_page':
          return new ChildPageBlock(
            blockResponse as ChildPageBlockResponse,
            notion
          )

        case 'code':
          return new CodeBlock(blockResponse as CodeBlockResponse, notion)

        case 'column_list':
          return new ColumnListBlock(
            blockResponse as ColumnListBlockResponse,
            notion
          )

        case 'column':
          return new ColumnBlock(blockResponse as ColumnBlockResponse, notion)

        case 'divider':
          return new DividerBlock(blockResponse as DividerBlockResponse, notion)

        case 'embed':
          return new EmbedBlock(blockResponse as EmbedBlockResponse, notion)

        case 'equation':
          return new EquationBlock(
            blockResponse as EquationBlockResponse,
            notion
          )

        case 'file':
          return new FileBlock(blockResponse as FileBlockResponse, notion)

        case 'heading_1':
          return new Heading1Block(
            blockResponse as Heading1BlockResponse,
            notion
          )

        case 'heading_2':
          return new Heading2Block(
            blockResponse as Heading2BlockResponse,
            notion
          )

        case 'heading_3':
          return new Heading3Block(
            blockResponse as Heading3BlockResponse,
            notion
          )

        case 'image':
          return new ImageBlock(blockResponse as ImageBlockResponse, notion)

        case 'link_preview':
          return new LinkPreviewBlock(
            blockResponse as LinkPreviewBlockResponse,
            notion
          )

        case 'mention':
          return new MentionBlock(blockResponse as MentionBlockResponse, notion)

        case 'numbered_list_item':
          return new NumberedListBlock(
            blockResponse as NumberedListBlockResponse,
            notion
          )

        case 'paragraph':
          return new ParagraphBlock(
            blockResponse as ParagraphBlockResponse,
            notion
          )

        case 'pdf':
          return new PDFBlock(blockResponse as PDFBlockResponse, notion)

        case 'quote':
          return new QuoteBlock(blockResponse as QuoteBlockResponse, notion)

        case 'synced_block':
          return new SyncedBlock(blockResponse as SyncedBlockResponse, notion)

        case 'table':
          return new TableBlock(blockResponse as TableBlockResponse, notion)

        case 'table_of_contents':
          return new TableOfContentsBlock(
            blockResponse as TableOfContentsBlockResponse,
            notion
          )

        case 'table_row':
          return new TableRowBlock(
            blockResponse as TableRowBlockResponse,
            notion
          )

        case 'to_do':
          return new ToDoBlock(blockResponse as ToDoBlockResponse, notion)

        case 'toggle':
          return new ToggleBlock(blockResponse as ToggleBlockResponse, notion)

        case 'video':
          return new VideoBlock(blockResponse as VideoBlockResponse, notion)

        default:
          return new Block(blockResponse, notion)
      }
    })
    this.next_cursor = blockListResponse.next_cursor
    this.has_more = blockListResponse.has_more
    this.block = blockListResponse.block
    this.request_id = blockListResponse.request_id
  }

  async toHTML(): Promise<string> {
    const htmlPartsPromises = this.results.map(
      async (item) => await item.toHTML()
    )
    const htmlParts = await Promise.all(htmlPartsPromises)
    let inList = false
    let listType = ''
    const wrappedHtmlParts = []

    for (const part of htmlParts) {
      if (part.startsWith("<li class='notion-bulleted-list-item'>")) {
        if (!inList || listType !== 'ul') {
          if (inList) {
            wrappedHtmlParts.push('</ol>')
          }
          wrappedHtmlParts.push('<ul>')
          inList = true
          listType = 'ul'
        }
        wrappedHtmlParts.push(part)
      } else if (part.startsWith("<li class='notion-numbered-list-item'>")) {
        if (!inList || listType !== 'ol') {
          if (inList) {
            wrappedHtmlParts.push('</ul>')
          }
          wrappedHtmlParts.push('<ol>')
          inList = true
          listType = 'ol'
        }
        wrappedHtmlParts.push(part)
      } else if (part.startsWith("<table class='notion-table'>")) {
        const tableParts = part.split('</tr>')
        const headerRow =
          tableParts[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>') +
          '</tr>'
        const bodyRows = tableParts.slice(1).join('</tr>')
        const wrappedTable = `<table class='notion-table'><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`
        wrappedHtmlParts.push(wrappedTable)
      } else {
        if (inList) {
          wrappedHtmlParts.push(listType === 'ul' ? '</ul>' : '</ol>')
          inList = false
        }
        wrappedHtmlParts.push(part)
      }
    }

    if (inList) {
      wrappedHtmlParts.push(listType === 'ul' ? '</ul>' : '</ol>')
    }

    return wrappedHtmlParts.join('')
  }

  toJSON(): BlockListResponse {
    return {
      object: this.object,
      type: this.type,
      results: this.results.map((block) => {
        return block.toJSON()
      }),
      next_cursor: this.next_cursor,
      has_more: this.has_more,
      block: this.block,
      request_id: this.request_id
    }
  }
}
