import { type CheckboxPagePropertyResponse } from './CheckboxPageProperty'
import { type CreatedByPagePropertyResponse } from './CreatedByPageProperty'
import { type CreatedTimePagePropertyResponse } from './CreatedTimePageProperty'
import { type DatePagePropertyResponse } from './DatePageProperty'
import { type EmailPagePropertyResponse } from './EmailPageProperty'
import { type FilesPagePropertyResponse } from './FilesPageProperty'
import { type FormulaPagePropertyResponse } from './FormulaPageProperty'
import { type LastEditedByPagePropertyResponse } from './LastEditedByPageProperty'
import { type LastEditedTimePagePropertyResponse } from './LastEditedTimePageProperty'
import { type MultiSelectPagePropertyResponse } from './MultiSelectPageProperty'
import { type NumberPagePropertyResponse } from './NumberPageProperty'
import { type PeoplePagePropertyResponse } from './PeoplePageProperty'
import { type PhoneNumberPagePropertyResponse } from './PhoneNumberPageProperty'
import { type RelationPagePropertyResponse } from './RelationPageProperty'
import { type RichTextPagePropertyResponse } from './RichTextPageProperty'
import { type RollupPagePropertyResponse } from './RollupPageProperty'
import { type SelectPagePropertyResponse } from './SelectPageProperty'
import { type StatusPagePropertyResponse } from './StatusPageResponse'
import { type TitlePagePropertyResponse } from './TitlePageProperty'
import { type URLPagePropertyResponse } from './URLPageProperty'
import { type UniqueIDPagePropertyResponse } from './UniqueIDPageProperty'
import { type VerificationPagePropertyResponse } from './VerificationPageProperty'

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
