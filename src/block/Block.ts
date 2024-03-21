import { type BlockClient } from '../client/BlockClient'
import { type UserResponse, type ParentResponse, User, Parent } from '../other'
import { type DeepPartial } from '../utils'
import { type BookmarkBlockResponse } from './BookmarkBlock'
import { type BreadcrumbBlockResponse } from './BreadcrumbBlock'
import { type BulletedListItemBlockResponse } from './BulletedListItemBlock'
import { type CalloutBlockResponse } from './CalloutBlock'
import { type ChildDatabaseBlockResponse } from './ChildDatabaseBlock'
import { type ChildPageBlockResponse } from './ChildPageBlock'
import { type CodeBlockResponse } from './CodeBlock'
import { type ColumnListBlockResponse } from './ColumnListBlock'
import { type DividerBlockResponse } from './DividerBlock'
import { type EmbedBlockResponse } from './EmbedBlock'
import { type EquationBlockResponse } from './EquationBlock'
import { type FileBlockResponse } from './FileBlock'
import {
  type Heading1BlockResponse,
  type Heading2BlockResponse,
  type Heading3BlockResponse
} from './HeadingBlock'
import { type ImageBlockResponse } from './ImageBlock'
import { type LinkPreviewBlockResponse } from './LinkPreviewBlock'
import { type MentionBlockResponse } from './MentionBlock'
import { type NumberedListBlockResponse } from './NumberedListBlock'
import { type PDFBlockResponse } from './PDFBlock'
import { type ParagraphBlockResponse } from './ParagraphBlock'
import { type QuoteBlockResponse } from './QuoteBlock'
import { type SyncedBlockResponse } from './SyncedBlock'
import { type TableBlockResponse } from './TableBlock'
import { type TableOfContentsBlockResponse } from './TableOfContentsBlock'
import { type TableRowBlockResponse } from './TableRowBlock'
import { type ToDoBlockResponse } from './ToDoBlock'
import { type ToggleBlockResponse } from './ToggleBlock'
import { type VideoBlockResponse } from './VideoBlock'

export interface BlockResponse {
  object: 'block'
  id: string
  parent: ParentResponse
  created_time: string
  last_edited_time: string
  created_by: UserResponse
  last_edited_by: UserResponse
  has_children: boolean
  archived: boolean

  type: string
}

export class Block {
  public readonly object = 'block'
  public readonly id: string
  public readonly parent: Parent
  public readonly created_time: string
  public readonly last_edited_time: string
  public readonly created_by: User
  public readonly last_edited_by: User
  public readonly has_children: boolean
  public readonly archived: boolean

  constructor(blockResponse: BlockResponse, notion: BlockClient) {
    this.id = blockResponse.id
    this.parent = new Parent(blockResponse.parent)
    this.created_time = blockResponse.created_time
    this.last_edited_time = blockResponse.last_edited_time
    this.created_by = new User(blockResponse.created_by)
    this.last_edited_by = new User(blockResponse.last_edited_by)
    this.has_children = blockResponse.has_children
    this.archived = blockResponse.archived
  }

  async toHTML(): Promise<string> {
    return await new Promise((resolve) => {
      resolve('')
    })
  }

  toJSON(): BlockResponse {
    return {
      object: this.object,
      id: this.id,
      parent: this.parent.toJSON(),
      created_time: this.created_time,
      last_edited_time: this.last_edited_time,
      created_by: this.created_by.toJSON(),
      last_edited_by: this.last_edited_by.toJSON(),
      has_children: this.has_children,
      archived: this.archived,
      type: 'block'
    }
  }
}

export type DeepPartialBlockResponseArray =
  | DeepPartial<BlockResponse[]>
  | DeepPartial<BookmarkBlockResponse[]>
  | DeepPartial<BreadcrumbBlockResponse[]>
  | DeepPartial<BulletedListItemBlockResponse[]>
  | DeepPartial<CalloutBlockResponse[]>
  | DeepPartial<ChildDatabaseBlockResponse[]>
  | DeepPartial<ChildPageBlockResponse[]>
  | DeepPartial<CodeBlockResponse[]>
  | DeepPartial<ColumnListBlockResponse[]>
  | DeepPartial<DividerBlockResponse[]>
  | DeepPartial<EmbedBlockResponse[]>
  | DeepPartial<EquationBlockResponse[]>
  | DeepPartial<FileBlockResponse[]>
  | DeepPartial<Heading1BlockResponse[]>
  | DeepPartial<Heading2BlockResponse[]>
  | DeepPartial<Heading3BlockResponse[]>
  | DeepPartial<ImageBlockResponse[]>
  | DeepPartial<LinkPreviewBlockResponse[]>
  | DeepPartial<MentionBlockResponse[]>
  | DeepPartial<NumberedListBlockResponse[]>
  | DeepPartial<PDFBlockResponse[]>
  | DeepPartial<ParagraphBlockResponse[]>
  | DeepPartial<QuoteBlockResponse[]>
  | DeepPartial<SyncedBlockResponse[]>
  | DeepPartial<TableBlockResponse[]>
  | DeepPartial<TableOfContentsBlockResponse[]>
  | DeepPartial<TableRowBlockResponse[]>
  | DeepPartial<ToDoBlockResponse[]>
  | DeepPartial<ToggleBlockResponse[]>
  | DeepPartial<VideoBlockResponse[]>
