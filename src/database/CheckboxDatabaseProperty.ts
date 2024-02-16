// @see https://developers.notion.com/reference/property-object#checkbox
export interface CheckboxDatabasePropertyResponse {
  id: string
  name: string
  type: 'checkbox'
  checkbox: Record<string, unknown>
}
