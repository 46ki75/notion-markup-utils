// @see https://developers.notion.com/reference/page-property-values#formula

export interface FormulaPagePropertyResponse {
  id: string
  type: 'formula'
  formula: {
    type: string
    number: number
  }
}

export class FormulaPageProperty {
  private readonly id: string
  private readonly type = 'formula'
  private readonly formula: {
    type: string
    number: number
  }

  constructor(formulaPagePropertyResponse: FormulaPagePropertyResponse) {
    this.id = formulaPagePropertyResponse.id
    this.formula = formulaPagePropertyResponse.formula
  }
}
