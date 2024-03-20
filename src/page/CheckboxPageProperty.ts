import { type DeepPartial } from '../utils'

// @see https://developers.notion.com/reference/page-property-values#checkbox
export interface CheckboxPagePropertyResponse {
  id: string
  type: 'checkbox'
  checkbox: boolean
}

export type CheckboxPagePropertyResponseSimplified = boolean

export class CheckboxPageProperty {
  public readonly id: string
  public readonly type = 'checkbox'
  public readonly checkbox: boolean

  constructor(checkboxPagePropertyResponse: CheckboxPagePropertyResponse) {
    this.id = checkboxPagePropertyResponse.id
    this.checkbox = checkboxPagePropertyResponse.checkbox
  }

  toJSON(): CheckboxPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      checkbox: this.checkbox
    }
  }

  simplify(): CheckboxPagePropertyResponseSimplified {
    return this.checkbox
  }
}

/**
 * The Checkbox column can be used when inserting into the database.
 * The usage is the same for both notion.page.create and notion.page.update.
 *
 * ### Usage
 * ```ts
 * await notion.pages.create({
 *   Name: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title'),
 *     Checkbox: p.checkbox()
 *   }
 * })
 * ```
 * ### When setting to a checked state:
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXX' },
 *   properties: {
 *     Name: p.title('My Title'),
 *     Checkbox: p.checkbox(true)
 *   }
 * })
 * ```
 */
export const checkbox = (
  isChecked?: boolean
): DeepPartial<CheckboxPagePropertyResponse> => {
  return {
    type: 'checkbox',
    checkbox: isChecked ?? false
  }
}
