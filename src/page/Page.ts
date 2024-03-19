import {
  type Heading2BlockRequest,
  type Heading3BlockRequest,
  type Heading1BlockRequest,
  type ParagraphBlockRequest,
  type BookmarkBlockRequest,
  type BreadcrumbBlockRequest,
  type BulletedListItemBlockRequest,
  type CodeBlockRequest,
  type DividerBlockRequest,
  type NumberedListItemBlockRequest,
  type QuoteBlockRequest,
  type TableBlockRequest,
  type ImageBlockRequest
} from '../block'
import {
  type ParentResponse,
  type EmojiResponse,
  type FileResponse,
  type UserResponse,
  User,
  File,
  Emoji,
  Parent,
  type UserResponseSimplified,
  type EmojiResponseSimplified,
  type FileResponseSimplified,
  type ParentResponseSimplified
} from '../other'
import { type DeepPartial } from '../utils'
import {
  ButtonPageProperty,
  type ButtonPagePropertyResponse
} from './ButtonPageProperty'
import {
  CheckboxPageProperty,
  type CheckboxPagePropertyResponse
} from './CheckboxPageProperty'
import {
  CreatedByPageProperty,
  type CreatedByPagePropertyResponse
} from './CreatedByPageProperty'
import {
  CreatedTimePageProperty,
  type CreatedTimePagePropertyResponse
} from './CreatedTimePageProperty'
import {
  DatePageProperty,
  type DatePagePropertyResponse
} from './DatePageProperty'
import {
  EmailPageProperty,
  type EmailPagePropertyResponse
} from './EmailPageProperty'
import {
  FilesPageProperty,
  type FilesPagePropertyResponse
} from './FilesPageProperty'
import {
  FormulaPageProperty,
  type FormulaPagePropertyResponse
} from './FormulaPageProperty'
import {
  LastEditedByPageProperty,
  type LastEditedByPagePropertyResponse
} from './LastEditedByPageProperty'
import {
  LastEditedTimePageProperty,
  type LastEditedTimePagePropertyResponse
} from './LastEditedTimePageProperty'
import {
  MultiSelectPageProperty,
  type MultiSelectPagePropertyResponse
} from './MultiSelectPageProperty'
import {
  NumberPageProperty,
  type NumberPagePropertyResponse
} from './NumberPageProperty'
import {
  type PagePropertyResponseSimplified,
  type PageProperty,
  type PagePropertyResponse
} from './PageProperty'
import {
  PeoplePageProperty,
  type PeoplePagePropertyResponse
} from './PeoplePageProperty'
import {
  PhoneNumberPageProperty,
  type PhoneNumberPagePropertyResponse
} from './PhoneNumberPageProperty'
import {
  RelationPageProperty,
  type RelationPagePropertyResponse
} from './RelationPageProperty'
import {
  RichTextPageProperty,
  type RichTextPagePropertyResponse
} from './RichTextPageProperty'
import {
  RollupPageProperty,
  type RollupPagePropertyResponse
} from './RollupPageProperty'
import {
  SelectPageProperty,
  type SelectPagePropertyResponse
} from './SelectPageProperty'
import {
  StatusPageProperty,
  type StatusPagePropertyResponse
} from './StatusPageProperty'
import {
  TitlePageProperty,
  type TitlePagePropertyResponse
} from './TitlePageProperty'
import {
  URLPageProperty,
  type URLPagePropertyResponse
} from './URLPageProperty'
import {
  UniqueIDPageProperty,
  type UniqueIDPagePropertyResponse
} from './UniqueIDPageProperty'
import {
  VerificationPageProperty,
  type VerificationPagePropertyResponse
} from './VerificationPageProperty'

export interface PageResponse<T = Record<string, PagePropertyResponse>> {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: UserResponse
  last_edited_by: UserResponse
  cover: FileResponse | null
  icon: FileResponse | EmojiResponse | null
  parent: ParentResponse
  archived: boolean
  properties: T
  url: string
  public_url: string | null
  developer_survey: string
  request_id: string
}

export interface PageResponseSimplified<
  T extends Record<string, PageProperty> = Record<string, PageProperty>
> {
  created_time: string
  last_edited_time: string
  created_by: UserResponseSimplified
  last_edited_by: UserResponseSimplified
  cover: FileResponseSimplified | null
  icon: FileResponseSimplified | EmojiResponseSimplified | null
  parent: ParentResponseSimplified
  archived: boolean
  properties: T
  url: string
  public_url: string | null
}

export class Page<
  T extends Record<string, PageProperty> = Record<string, PageProperty>
> {
  public readonly object = 'page'
  public readonly id: string
  public readonly created_time: string
  public readonly last_edited_time: string
  public readonly created_by: User
  public readonly last_edited_by: User
  public readonly cover: File | null
  public readonly icon: File | Emoji | null
  public readonly parent: Parent
  public readonly archived: boolean
  public readonly properties: T
  public readonly url: string
  public readonly public_url: string | null
  public readonly developer_survey: string
  public readonly request_id: string

  constructor(
    pageResponse: PageResponse<Record<string, PagePropertyResponse>>
  ) {
    this.id = pageResponse.id
    this.created_time = pageResponse.created_time
    this.last_edited_time = pageResponse.last_edited_time
    this.created_by = new User(pageResponse.created_by)
    this.last_edited_by = new User(pageResponse.last_edited_by)
    this.cover =
      pageResponse.cover != null ? new File(pageResponse.cover) : null
    if (pageResponse.icon != null) {
      this.icon =
        pageResponse.icon.type === 'emoji'
          ? new Emoji(pageResponse.icon)
          : new File(pageResponse.icon)
    } else {
      this.icon = null
    }
    this.parent = new Parent(pageResponse.parent)
    this.archived = pageResponse.archived
    this.properties = pageResponse.properties as any
    this.url = pageResponse.url
    this.public_url = pageResponse.public_url
    this.developer_survey = pageResponse.developer_survey
    this.request_id = pageResponse.request_id

    const propertyKeys = Object.keys(pageResponse.properties)
    for (const key of propertyKeys) {
      switch ((pageResponse.properties as any)[key].type) {
        case 'button':
          ;(this.properties as any)[key] = new ButtonPageProperty(
            (pageResponse.properties as any)[key] as ButtonPagePropertyResponse
          )
          break

        case 'checkbox':
          ;(this.properties as any)[key] = new CheckboxPageProperty(
            (pageResponse.properties as any)[
              key
            ] as CheckboxPagePropertyResponse
          )
          break

        case 'created_by':
          ;(this.properties as any)[key] = new CreatedByPageProperty(
            (pageResponse.properties as any)[
              key
            ] as CreatedByPagePropertyResponse
          )
          break

        case 'created_time':
          ;(this.properties as any)[key] = new CreatedTimePageProperty(
            (pageResponse.properties as any)[
              key
            ] as CreatedTimePagePropertyResponse
          )
          break

        case 'date':
          ;(this.properties as any)[key] = new DatePageProperty(
            (pageResponse.properties as any)[key] as DatePagePropertyResponse
          )
          break

        case 'email':
          ;(this.properties as any)[key] = new EmailPageProperty(
            (pageResponse.properties as any)[key] as EmailPagePropertyResponse
          )
          break

        case 'files':
          ;(this.properties as any)[key] = new FilesPageProperty(
            (pageResponse.properties as any)[key] as FilesPagePropertyResponse
          )
          break

        case 'formula':
          ;(this.properties as any)[key] = new FormulaPageProperty(
            (pageResponse.properties as any)[key] as FormulaPagePropertyResponse
          )
          break

        case 'last_edited_by':
          ;(this.properties as any)[key] = new LastEditedByPageProperty(
            (pageResponse.properties as any)[
              key
            ] as LastEditedByPagePropertyResponse
          )
          break

        case 'last_edited_time':
          ;(this.properties as any)[key] = new LastEditedTimePageProperty(
            (pageResponse.properties as any)[
              key
            ] as LastEditedTimePagePropertyResponse
          )
          break

        case 'multi_select':
          ;(this.properties as any)[key] = new MultiSelectPageProperty(
            (pageResponse.properties as any)[
              key
            ] as MultiSelectPagePropertyResponse
          )
          break

        case 'number':
          ;(this.properties as any)[key] = new NumberPageProperty(
            (pageResponse.properties as any)[key] as NumberPagePropertyResponse
          )
          break

        case 'people':
          ;(this.properties as any)[key] = new PeoplePageProperty(
            (pageResponse.properties as any)[key] as PeoplePagePropertyResponse
          )
          break

        case 'phone_number':
          ;(this.properties as any)[key] = new PhoneNumberPageProperty(
            (pageResponse.properties as any)[
              key
            ] as PhoneNumberPagePropertyResponse
          )
          break

        case 'relation':
          ;(this.properties as any)[key] =
            'relation' in (this.properties as any)[key]
              ? new RelationPageProperty(
                  (pageResponse.properties as any)[
                    key
                  ] as RelationPagePropertyResponse
                )
              : new RollupPageProperty(
                  (pageResponse.properties as any)[
                    key
                  ] as RollupPagePropertyResponse
                )
          break

        case 'rich_text':
          ;(this.properties as any)[key] = new RichTextPageProperty(
            (pageResponse.properties as any)[
              key
            ] as RichTextPagePropertyResponse
          )
          break

        case 'select':
          ;(this.properties as any)[key] = new SelectPageProperty(
            (pageResponse.properties as any)[key] as SelectPagePropertyResponse
          )
          break

        case 'status':
          ;(this.properties as any)[key] = new StatusPageProperty(
            (pageResponse.properties as any)[key] as StatusPagePropertyResponse
          )
          break

        case 'title':
          ;(this.properties as any)[key] = new TitlePageProperty(
            (pageResponse.properties as any)[key] as TitlePagePropertyResponse
          )
          break

        case 'url':
          ;(this.properties as any)[key] = new URLPageProperty(
            (pageResponse.properties as any)[key] as URLPagePropertyResponse
          )
          break

        case 'unique_id':
          ;(this.properties as any)[key] = new UniqueIDPageProperty(
            (pageResponse.properties as any)[
              key
            ] as UniqueIDPagePropertyResponse
          )
          break

        case 'verification':
          ;(this.properties as any)[key] = new VerificationPageProperty(
            (pageResponse.properties as any)[
              key
            ] as VerificationPagePropertyResponse
          )
          break
      }
    }
  }

  toJSON(): PageResponse {
    const properties: Record<string, PagePropertyResponse> = {}
    const propertyKeys = Object.keys(this.properties)
    for (const key of propertyKeys) {
      properties[key] = (this.properties as any)[key].toJSON()
    }

    return {
      object: 'page',
      id: this.id,
      created_time: this.created_time,
      last_edited_time: this.last_edited_time,
      created_by: this.created_by,
      last_edited_by: this.last_edited_by,
      cover: this.cover != null ? this.cover.toJSON() : null,
      icon: this.icon != null ? this.icon.toJSON() : null,
      parent: this.parent,
      archived: this.archived,
      properties,
      url: this.url,
      public_url: this.public_url,
      developer_survey: this.developer_survey,
      request_id: this.request_id
    }
  }

  /**
   *
   * @deprecated Deprecated due to the lack of type inference for the object returned after using this method.
   */
  simplify(): PageResponseSimplified<T> {
    const propertyKeys = Object.keys(this.properties)
    const properties: Record<string, PagePropertyResponseSimplified> = {}
    for (const key of propertyKeys) {
      properties[key] = (this.properties as any)[key].simplify()
    }

    return {
      created_time: this.created_time,
      last_edited_time: this.last_edited_time,
      created_by: this.created_by.simplify(),
      last_edited_by: this.last_edited_by.simplify(),
      cover: this.cover?.simplify() ?? null,
      icon: this.icon?.simplify() ?? null,
      parent: this.parent.simplify(),
      archived: this.archived,
      properties: properties as any,
      url: this.url,
      public_url: this.public_url
    }
  }
}

export type BlockRequest =
  | BreadcrumbBlockRequest
  | BookmarkBlockRequest
  | BulletedListItemBlockRequest
  | CodeBlockRequest
  | DividerBlockRequest
  | ImageBlockRequest
  | NumberedListItemBlockRequest
  | QuoteBlockRequest
  | Heading1BlockRequest
  | Heading2BlockRequest
  | Heading3BlockRequest
  | ParagraphBlockRequest
  | TableBlockRequest

export interface PageCreateRequest {
  parent: { page_id: string } | { database_id: string }
  properties: Record<string, DeepPartial<PagePropertyResponse>>
  children?: BlockRequest[]
}
