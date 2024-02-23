// @see https://developers.notion.com/reference/page-property-values#checkbox
export interface CheckboxPagePropertyResponse {
  id: string
  type: 'checkbox'
  checkbox: boolean
}

export type CheckboxPagePropertyResponseSimplified = boolean

export class CheckboxPageProperty {
  private readonly id: string
  private readonly type = 'checkbox'
  private readonly checkbox: boolean

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
