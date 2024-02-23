import {
  type CheckboxPagePropertyResponseSimplified,
  type CheckboxPageProperty,
  type CheckboxPagePropertyResponse
} from './CheckboxPageProperty'
import {
  type CreatedByPagePropertyResponseSimplified,
  type CreatedByPageProperty,
  type CreatedByPagePropertyResponse
} from './CreatedByPageProperty'
import {
  type CreatedTimePagePropertyResponseSimplified,
  type CreatedTimePageProperty,
  type CreatedTimePagePropertyResponse
} from './CreatedTimePageProperty'
import {
  type DatePagePropertyResponseSimplified,
  type DatePageProperty,
  type DatePagePropertyResponse
} from './DatePageProperty'
import {
  type EmailPagePropertyResponseSimplified,
  type EmailPageProperty,
  type EmailPagePropertyResponse
} from './EmailPageProperty'
import {
  type FilesPagePropertyResponseSimplified,
  type FilesPageProperty,
  type FilesPagePropertyResponse
} from './FilesPageProperty'
import {
  type FormulaPagePropertyResponseSimplified,
  type FormulaPageProperty,
  type FormulaPagePropertyResponse
} from './FormulaPageProperty'
import {
  type LastEditedByPagePropertyResponseSimplified,
  type LastEditedByPageProperty,
  type LastEditedByPagePropertyResponse
} from './LastEditedByPageProperty'
import {
  type LastEditedTimePagePropertyResponseSimplified,
  type LastEditedTimePageProperty,
  type LastEditedTimePagePropertyResponse
} from './LastEditedTimePageProperty'
import {
  type MultiSelectPagePropertyResponse,
  type MultiSelectPageProperty,
  type MultiSelectPagePropertyResponseSimplified
} from './MultiSelectPageProperty'
import {
  type NumberPagePropertyResponse,
  type NumberPageProperty,
  type NumberPagePropertyResponseSimplified
} from './NumberPageProperty'
import {
  type PeoplePagePropertyResponse,
  type PeoplePageProperty,
  type PeoplePagePropertyResponseSimplified
} from './PeoplePageProperty'
import {
  type PhoneNumberPagePropertyResponse,
  type PhoneNumberPageProperty,
  type PhoneNumberPagePropertyResponseSimplified
} from './PhoneNumberPageProperty'
import {
  type RelationPagePropertyResponse,
  type RelationPageProperty,
  type RelationPagePropertyResponseSimplified
} from './RelationPageProperty'
import {
  type RichTextPagePropertyResponse,
  type RichTextPageProperty,
  type RichTextPagePropertyResponseSimplified
} from './RichTextPageProperty'
import {
  type RollupPagePropertyResponse,
  type RollupPageProperty,
  type RollupPagePropertyResponseSimplified
} from './RollupPageProperty'
import {
  type SelectPagePropertyResponse,
  type SelectPageProperty,
  type SelectPagePropertyResponseSimplified
} from './SelectPageProperty'
import {
  type StatusPagePropertyResponse,
  type StatusPageProperty,
  type StatusPagePropertyResponseSimplified
} from './StatusPageProperty'
import {
  type TitlePagePropertyResponse,
  type TitlePageProperty,
  type TitlePagePropertyResponseSimplified
} from './TitlePageProperty'
import {
  type URLPagePropertyResponse,
  type URLPageProperty,
  type URLPagePropertyResponseSimplified
} from './URLPageProperty'
import {
  type UniqueIDPagePropertyResponse,
  type UniqueIDPageProperty,
  type UniqueIDPagePropertyResponseSimplified
} from './UniqueIDPageProperty'
import {
  type VerificationPagePropertyResponse,
  type VerificationPageProperty,
  type VerificationPagePropertyResponseSimplified
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

export type PagePropertyResponseSimplified =
  | CheckboxPagePropertyResponseSimplified
  | CreatedByPagePropertyResponseSimplified
  | CreatedTimePagePropertyResponseSimplified
  | DatePagePropertyResponseSimplified
  | EmailPagePropertyResponseSimplified
  | FilesPagePropertyResponseSimplified
  | FormulaPagePropertyResponseSimplified
  | LastEditedByPagePropertyResponseSimplified
  | LastEditedTimePagePropertyResponseSimplified
  | MultiSelectPagePropertyResponseSimplified
  | NumberPagePropertyResponseSimplified
  | PeoplePagePropertyResponseSimplified
  | PhoneNumberPagePropertyResponseSimplified
  | RelationPagePropertyResponseSimplified
  | RichTextPagePropertyResponseSimplified
  | RollupPagePropertyResponseSimplified
  | SelectPagePropertyResponseSimplified
  | StatusPagePropertyResponseSimplified
  | TitlePagePropertyResponseSimplified
  | URLPagePropertyResponseSimplified
  | UniqueIDPagePropertyResponseSimplified
  | VerificationPagePropertyResponseSimplified
