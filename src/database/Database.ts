import { RichText, type RichTextResponse } from '../block'
import {
  Emoji,
  type EmojiResponse,
  File,
  type FileResponse,
  type ParentResponse,
  type UserResponse,
  Parent,
  User
} from '../other'
import {
  CheckboxDatabaseProperty,
  type CheckboxDatabasePropertyResponse
} from './CheckboxDatabaseProperty'
import {
  CreatedByDatabaseProperty,
  type CreatedByDatabasePropertyResponse
} from './CreatedByDatabaseProperty'
import {
  CreatedTimeDatabaseProperty,
  type CreatedTimeDatabasePropertyResponse
} from './CreatedTimeDatabaseProperty'
import {
  type DatabaseProperty,
  type DatabasePropertyResponse
} from './DatabaseProperty'
import {
  DateDatabaseProperty,
  type DateDatabasePropertyResponse
} from './DateDatabaseProperty'
import {
  EmailDatabaseProperty,
  type EmailDatabasePropertyResponse
} from './EmailDatabaseProperty'
import {
  FilesDatabaseProperty,
  type FilesDatabasePropertyResponse
} from './FilesDatabaseProperty'
import {
  FormulaDatabaseProperty,
  type FormulaDatabasePropertyResponse
} from './FormulaDatabaseProperty'
import {
  LastEditedTimeDatabaseProperty,
  type LastEditedTimeDatabasePropertyResponse
} from './LastEditedTimeDatabaseProperty'
import {
  MultiSelectDatabaseProperty,
  type MultiSelectDatabasePropertyResponse
} from './MultiSelectDatabaseProperty'
import {
  NumberDatabaseProperty,
  type NumberDatabasePropertyResponse
} from './NumberDatabaseProperty'
import {
  PhoneNumberDatabaseProperty,
  type PhoneNumberDatabasePropertyResponse
} from './PhoneNumberDatabaseProperty'
import {
  PeopleDatabaseProperty,
  type PeopleDatabasePropertyResponse
} from './PoepleDatabaseProperty'
import {
  RelationDatabaseProperty,
  type RelationDatabasePropertyResponse
} from './RelationDatabaseProperty'
import {
  RichTextDatabaseProperty,
  type RichTextDatabasePropertyResponse
} from './RichTextDatabaseProperty'
import {
  RollupDatabaseProperty,
  type RollupDatabasePropertyResponse
} from './RollupDatabaseProperty'
import {
  SelectDatabaseProperty,
  type SelectDatabasePropertyResponse
} from './SelectDatabaseProperty'
import {
  StatusDatabaseProperty,
  type StatusDatabasePropertyResponse
} from './StatusDatabaseProperty'
import {
  TitleDatabaseProperty,
  type TitleDatabasePropertyResponse
} from './TitleDatabaseProperty'
import {
  URLDatabaseProperty,
  type URLDatabasePropertyResponse
} from './URLDatabaseProperty'

export interface DatabaseResponse<
  T extends Record<string, DatabasePropertyResponse> = Record<
    string,
    DatabasePropertyResponse
  >
> {
  object: 'database'
  id: string
  cover: FileResponse | null
  icon: FileResponse | EmojiResponse | null
  created_time: string
  created_by: UserResponse
  last_edited_time: string
  last_edited_by: UserResponse
  title: RichTextResponse[]
  description: RichTextResponse[]
  properties: T
  is_inline: boolean
  parent: ParentResponse
  url: string
  public_url: string | null
  archived: boolean
  developer_survey: string
  request_id: string
}

export class Database<
  T extends Record<string, DatabaseProperty> = Record<string, DatabaseProperty>
> {
  public readonly object = 'database'
  public readonly id: string
  public readonly cover: File | null
  public readonly icon: File | Emoji | null
  public readonly created_time: string
  public readonly created_by: User
  public readonly last_edited_time: string
  public readonly last_edited_by: User
  public readonly title: RichText[]
  public readonly description: RichText[]
  public readonly is_inline: boolean
  public readonly properties: T
  public readonly parent: Parent
  public readonly url: string
  public readonly public_url: string | null
  public readonly archived: boolean
  public readonly developer_survey: string
  public readonly request_id: string

  constructor(databaseResponse: DatabaseResponse) {
    this.id = databaseResponse.id
    this.cover =
      databaseResponse.cover != null ? new File(databaseResponse.cover) : null
    if (databaseResponse.icon != null) {
      this.icon =
        databaseResponse.icon.type === 'emoji'
          ? new Emoji(databaseResponse.icon)
          : new File(databaseResponse.icon)
    } else {
      this.icon = null
    }
    this.created_time = databaseResponse.created_time
    this.created_by = new User(databaseResponse.created_by)
    this.last_edited_time = databaseResponse.last_edited_time
    this.last_edited_by = new User(databaseResponse.last_edited_by)
    this.title = databaseResponse.title.map((text) => new RichText(text))
    this.description = databaseResponse.description.map(
      (text) => new RichText(text)
    )
    this.is_inline = databaseResponse.is_inline
    this.parent = new Parent(databaseResponse.parent)
    this.url = databaseResponse.url
    this.public_url = databaseResponse.public_url
    this.archived = databaseResponse.archived
    this.developer_survey = databaseResponse.developer_survey
    this.request_id = databaseResponse.request_id

    this.properties = databaseResponse.properties as any

    const keys = Object.keys(databaseResponse.properties)
    for (const key of keys) {
      switch (databaseResponse.properties[key].type) {
        case 'checkbox': {
          ;(this.properties as any)[key] = new CheckboxDatabaseProperty(
            databaseResponse.properties[key] as CheckboxDatabasePropertyResponse
          )
          break
        }

        case 'created_by': {
          ;(this.properties as any)[key] = new CreatedByDatabaseProperty(
            databaseResponse.properties[
              key
            ] as CreatedByDatabasePropertyResponse
          )
          break
        }

        case 'created_time': {
          ;(this.properties as any)[key] = new CreatedTimeDatabaseProperty(
            databaseResponse.properties[
              key
            ] as CreatedTimeDatabasePropertyResponse
          )
          break
        }

        case 'date': {
          ;(this.properties as any)[key] = new DateDatabaseProperty(
            databaseResponse.properties[key] as DateDatabasePropertyResponse
          )
          break
        }

        case 'email': {
          ;(this.properties as any)[key] = new EmailDatabaseProperty(
            databaseResponse.properties[key] as EmailDatabasePropertyResponse
          )
          break
        }

        case 'files': {
          ;(this.properties as any)[key] = new FilesDatabaseProperty(
            databaseResponse.properties[key] as FilesDatabasePropertyResponse
          )
          break
        }

        case 'formula': {
          ;(this.properties as any)[key] = new FormulaDatabaseProperty(
            databaseResponse.properties[key] as FormulaDatabasePropertyResponse
          )
          break
        }

        case 'last_edited_time': {
          ;(this.properties as any)[key] = new LastEditedTimeDatabaseProperty(
            databaseResponse.properties[
              key
            ] as LastEditedTimeDatabasePropertyResponse
          )
          break
        }

        case 'multi_select': {
          ;(this.properties as any)[key] = new MultiSelectDatabaseProperty(
            databaseResponse.properties[
              key
            ] as MultiSelectDatabasePropertyResponse
          )
          break
        }

        case 'number': {
          ;(this.properties as any)[key] = new NumberDatabaseProperty(
            databaseResponse.properties[key] as NumberDatabasePropertyResponse
          )
          break
        }

        case 'phone_number': {
          ;(this.properties as any)[key] = new PhoneNumberDatabaseProperty(
            databaseResponse.properties[
              key
            ] as PhoneNumberDatabasePropertyResponse
          )
          break
        }

        case 'people': {
          ;(this.properties as any)[key] = new PeopleDatabaseProperty(
            databaseResponse.properties[key] as PeopleDatabasePropertyResponse
          )
          break
        }

        case 'relation': {
          ;(this.properties as any)[key] = new RelationDatabaseProperty(
            databaseResponse.properties[key] as RelationDatabasePropertyResponse
          )
          break
        }

        case 'rich_text': {
          ;(this.properties as any)[key] = new RichTextDatabaseProperty(
            databaseResponse.properties[key] as RichTextDatabasePropertyResponse
          )
          break
        }

        case 'rollup': {
          ;(this.properties as any)[key] = new RollupDatabaseProperty(
            databaseResponse.properties[key] as RollupDatabasePropertyResponse
          )
          break
        }

        case 'select': {
          ;(this.properties as any)[key] = new SelectDatabaseProperty(
            databaseResponse.properties[key] as SelectDatabasePropertyResponse
          )
          break
        }

        case 'status': {
          ;(this.properties as any)[key] = new StatusDatabaseProperty(
            databaseResponse.properties[key] as StatusDatabasePropertyResponse
          )
          break
        }

        case 'title': {
          ;(this.properties as any)[key] = new TitleDatabaseProperty(
            databaseResponse.properties[key] as TitleDatabasePropertyResponse
          )
          break
        }

        case 'url': {
          ;(this.properties as any)[key] = new URLDatabaseProperty(
            databaseResponse.properties[key] as URLDatabasePropertyResponse
          )
          break
        }

        default: {
          console.warn(`Unknown property type for key: ${key}`)
          break
        }
      }
    }
  }

  toJSON(): DatabaseResponse {
    const properties: Record<string, DatabasePropertyResponse> = {}
    const propertyKeys = Object.keys(this.properties)
    for (const key of propertyKeys) {
      properties[key] = this.properties[key].toJSON()
    }

    return {
      object: this.object,
      id: this.id,
      cover: this.cover != null ? this.cover.toJSON() : null,
      icon: this.icon != null ? this.icon.toJSON() : null,
      created_time: this.created_time,
      created_by: this.created_by.toJSON(),
      last_edited_time: this.last_edited_time,
      last_edited_by: this.last_edited_by.toJSON(),
      title: this.title.map((text) => text.toJSON()),
      description: this.description.map((text) => text.toJSON()),
      properties,
      is_inline: this.is_inline,
      parent: this.parent.toJSON(),
      url: this.url,
      public_url: this.public_url,
      developer_survey: this.developer_survey,
      archived: this.archived,
      request_id: this.request_id
    }
  }
}
