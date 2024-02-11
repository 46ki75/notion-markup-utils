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
  public readonly results: Block[]
  public readonly next_cursor: null | string
  public readonly has_more: boolean
  public readonly block: unknown
  public readonly request_id: string

  constructor(blockListResponse: BlockListResponse) {
    this.results = blockListResponse.results.map((blockResponse) => {
      switch (blockResponse.type) {
        case 'bookmark':
          return new BookmarkBlock(blockResponse as BookmarkBlockResponse)

        case 'breadcrumb':
          return new BreadcrumbBlock(blockResponse as BreadcrumbBlockResponse)

        case 'bulleted_list_item':
          return new BulletedListItemBlock(
            blockResponse as BulletedListItemBlockResponse
          )

        case 'callout':
          return new CalloutBlock(blockResponse as CalloutBlockRespose)

        case 'child_database':
          return new ChildDatabaseBlock(
            blockResponse as ChildDatabaseBlockResponse
          )

        case 'child_page':
          return new ChildPageBlock(blockResponse as ChildPageBlockResponse)

        case 'code':
          return new CodeBlock(blockResponse as CodeBlockResponse)

        case 'column_list':
          return new ColumnListBlock(blockResponse as ColumnListBlockResponse)

        case 'column':
          return new ColumnBlock(blockResponse as ColumnBlockResponse)

        case 'divider':
          return new DividerBlock(blockResponse as DividerBlockResponse)

        case 'embed':
          return new EmbedBlock(blockResponse as EmbedBlockResponse)

        case 'equation':
          return new EquationBlock(blockResponse as EquationBlockResponse)

        case 'file':
          return new FileBlock(blockResponse as FileBlockResponse)

        case 'heading_1':
          return new Heading1Block(blockResponse as Heading1BlockResponse)

        case 'heading_2':
          return new Heading2Block(blockResponse as Heading2BlockResponse)

        case 'heading_3':
          return new Heading3Block(blockResponse as Heading3BlockResponse)

        case 'image':
          return new ImageBlock(blockResponse as ImageBlockResponse)

        case 'link_preview':
          return new LinkPreviewBlock(blockResponse as LinkPreviewBlockResponse)

        case 'mention':
          return new MentionBlock(blockResponse as MentionBlockResponse)

        case 'numbered_list_item':
          return new NumberedListBlock(
            blockResponse as NumberedListBlockResponse
          )

        case 'paragraph':
          return new ParagraphBlock(blockResponse as ParagraphBlockResponse)

        case 'pdf':
          return new PDFBlock(blockResponse as PDFBlockResponse)

        case 'quote':
          return new QuoteBlock(blockResponse as QuoteBlockResponse)

        case 'synced_block':
          return new SyncedBlock(blockResponse as SyncedBlockResponse)

        case 'table':
          return new TableBlock(blockResponse as TableBlockResponse)

        case 'table_of_contents':
          return new TableOfContentsBlock(
            blockResponse as TableOfContentsBlockResponse
          )

        case 'table_row':
          return new TableRowBlock(blockResponse as TableRowBlockResponse)

        case 'to_do':
          return new ToDoBlock(blockResponse as ToDoBlockResponse)

        case 'toggle':
          return new ToggleBlock(blockResponse as ToggleBlockResponse)

        case 'video':
          return new VideoBlock(blockResponse as VideoBlockResponse)

        default:
          return new Block(blockResponse)
      }
    })
    this.next_cursor = blockListResponse.next_cursor
    this.has_more = blockListResponse.has_more
    this.block = blockListResponse.block
    this.request_id = blockListResponse.request_id
  }
}
