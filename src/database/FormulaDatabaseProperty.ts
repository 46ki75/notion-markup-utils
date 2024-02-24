// @see https://developers.notion.com/reference/property-object#formula

export interface FormulaDatabasePropertyResponse {
  id: string
  name: string
  type: 'formula'
  formula: {
    expression: string
  }
}

export class FormulaDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'formula'
  public readonly formula: {
    expression: string
  }

  constructor(
    formulaDatabasePropertyResponse: FormulaDatabasePropertyResponse
  ) {
    this.id = formulaDatabasePropertyResponse.id
    this.name = formulaDatabasePropertyResponse.name
    this.type = formulaDatabasePropertyResponse.type
    this.formula = formulaDatabasePropertyResponse.formula
  }

  toJSON(): FormulaDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      formula: this.formula
    }
  }
}
