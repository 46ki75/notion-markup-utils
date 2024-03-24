import { type Color } from '../other'
import { type Language } from './CodeBlock'
import { type RichTextDOMJSON } from './RichText'

// - 'breadcrumb'

// - 'child_database'
// - 'child_page'
// - 'file'
// - 'link_preview'
// - 'mention'
// - 'pdf'
// - 'synced_block'
// - 'table_of_contents'
// - 'video'

export type DOMType = BlockType | 'root' | 'ul' | 'ol'

export type BlockType =
  | 'bookmark'
  | 'breadcrumb'
  | 'bulleted_list_item'
  | 'callout'
  | 'child_database'
  | 'child_page'
  | 'code'
  | 'column_list'
  | 'column'
  | 'divider'
  | 'embed'
  | 'equation'
  | 'file'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'image'
  | 'link_preview'
  | 'mention'
  | 'numbered_list_item'
  | 'paragraph'
  | 'pdf'
  | 'quote'
  | 'synced_block'
  | 'table'
  | 'table_row'
  | 'table_of_contents'
  | 'to_do'
  | 'toggle'
  | 'video'

export interface DOMJSON {
  type: DOMType
  url?: string
  expression?: string
  rich_text: RichTextDOMJSON[]
  caption: RichTextDOMJSON[]
  children: DOMJSON[]
  language?: Language
  color?: Color
  table?: RichTextDOMJSON[][][]
  bookmark?: {
    title: string
    description: string
    image: string
  }
}
