// @see https://developers.notion.com/reference/page-property-values#checkbox
export interface CheckboxPagePropertyResponse {
  id: string
  type: 'checkbox'
  checkbox: boolean
}

export class CheckboxPageProperty {
  private readonly id: string
  private readonly type: string = 'checkbox'
  private readonly checkbox: boolean

  constructor(checkboxPagePropertyResponse: CheckboxPagePropertyResponse) {
    this.id = checkboxPagePropertyResponse.id
    this.checkbox = checkboxPagePropertyResponse.checkbox
  }
}
