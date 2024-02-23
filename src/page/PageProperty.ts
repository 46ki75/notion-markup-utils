import {
  type CheckboxPageProperty,
  type CheckboxPagePropertyResponse
} from './CheckboxPageProperty'
import {
  type CreatedByPageProperty,
  type CreatedByPagePropertyResponse
} from './CreatedByPageProperty'
import {
  type CreatedTimePageProperty,
  type CreatedTimePagePropertyResponse
} from './CreatedTimePageProperty'
import {
  type DatePageProperty,
  type DatePagePropertyResponse
} from './DatePageProperty'
import {
  type EmailPageProperty,
  type EmailPagePropertyResponse
} from './EmailPageProperty'
import {
  type FilesPageProperty,
  type FilesPagePropertyResponse
} from './FilesPageProperty'
import {
  type FormulaPageProperty,
  type FormulaPagePropertyResponse
} from './FormulaPageProperty'
import {
  type LastEditedByPageProperty,
  type LastEditedByPagePropertyResponse
} from './LastEditedByPageProperty'
import {
  type LastEditedTimePageProperty,
  type LastEditedTimePagePropertyResponse
} from './LastEditedTimePageProperty'
import {
  type MultiSelectPagePropertyResponse,
  type MultiSelectPageProperty
} from './MultiSelectPageProperty'
import {
  type NumberPagePropertyResponse,
  type NumberPageProperty
} from './NumberPageProperty'
import {
  type PeoplePagePropertyResponse,
  type PeoplePageProperty
} from './PeoplePageProperty'
import {
  type PhoneNumberPagePropertyResponse,
  type PhoneNumberPageProperty
} from './PhoneNumberPageProperty'
import {
  type RelationPagePropertyResponse,
  type RelationPageProperty
} from './RelationPageProperty'
import {
  type RichTextPagePropertyResponse,
  type RichTextPageProperty
} from './RichTextPageProperty'
import {
  type RollupPagePropertyResponse,
  type RollupPageProperty
} from './RollupPageProperty'
import {
  type SelectPagePropertyResponse,
  type SelectPageProperty
} from './SelectPageProperty'
import {
  type StatusPagePropertyResponse,
  type StatusPageProperty
} from './StatusPageProperty'
import {
  type TitlePagePropertyResponse,
  type TitlePageProperty
} from './TitlePageProperty'
import {
  type URLPagePropertyResponse,
  type URLPageProperty
} from './URLPageProperty'
import {
  type UniqueIDPagePropertyResponse,
  type UniqueIDPageProperty
} from './UniqueIDPageProperty'
import {
  type VerificationPagePropertyResponse,
  type VerificationPageProperty
} from './VerificationPageProperty'

export type PageProperty =
  | CheckboxPageProperty
  | CreatedByPageProperty
  | CreatedTimePageProperty
  | DatePageProperty
  | EmailPageProperty
  | FilesPageProperty
  | FormulaPageProperty
  | LastEditedByPageProperty
  | LastEditedTimePageProperty
  | MultiSelectPageProperty
  | NumberPageProperty
  | PeoplePageProperty
  | PhoneNumberPageProperty
  | RelationPageProperty
  | RichTextPageProperty
  | RollupPageProperty
  | SelectPageProperty
  | StatusPageProperty
  | TitlePageProperty
  | URLPageProperty
  | UniqueIDPageProperty
  | VerificationPageProperty

export type PagePropertyResponse =
  | CheckboxPagePropertyResponse
  | CreatedByPagePropertyResponse
  | CreatedTimePagePropertyResponse
  | DatePagePropertyResponse
  | EmailPagePropertyResponse
  | FilesPagePropertyResponse
  | FormulaPagePropertyResponse
  | LastEditedByPagePropertyResponse
  | LastEditedTimePagePropertyResponse
  | MultiSelectPagePropertyResponse
  | NumberPagePropertyResponse
  | PeoplePagePropertyResponse
  | PhoneNumberPagePropertyResponse
  | RelationPagePropertyResponse
  | RichTextPagePropertyResponse
  | RollupPagePropertyResponse
  | SelectPagePropertyResponse
  | StatusPagePropertyResponse
  | TitlePagePropertyResponse
  | URLPagePropertyResponse
  | UniqueIDPagePropertyResponse
  | VerificationPagePropertyResponse
