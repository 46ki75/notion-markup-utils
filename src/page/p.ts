import { checkbox } from './CheckboxPageProperty'
import { date } from './DatePageProperty'
import { email } from './EmailPageProperty'
import { multiSelect } from './MultiSelectPageProperty'
import { number } from './NumberPageProperty'
import { phone } from './PhoneNumberPageProperty'
import { richText } from './RichTextPageProperty'
import { select } from './SelectPageProperty'
import { status } from './StatusPageProperty'
import { title } from './TitlePageProperty'
import { url } from './URLPageProperty'

/**
 * You can use this when editing properties of a Notion database.
 */
export const p = {
  title,
  richText,
  number,
  select,
  multiSelect,
  status,
  date,
  checkbox,
  url,
  email,
  phone
}
