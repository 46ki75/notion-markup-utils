// @see https://developers.notion.com/reference/property-object#checkbox
export interface CheckboxDatabasePropertyResponse {
  id: string
  name: string
  type: 'checkbox'
  checkbox: Record<string, unknown>
}

export class CheckboxDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'checkbox'
  public readonly checkbox: Record<string, unknown>

  constructor(
    checkboxDatabasePropertyResponse: CheckboxDatabasePropertyResponse
  ) {
    this.id = checkboxDatabasePropertyResponse.id
    this.name = checkboxDatabasePropertyResponse.name
    this.type = checkboxDatabasePropertyResponse.type
    this.checkbox = checkboxDatabasePropertyResponse.checkbox
  }
}
