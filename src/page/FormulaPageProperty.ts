// @see https://developers.notion.com/reference/page-property-values#formula

export interface FormulaPagePropertyResponse {
  id: string
  type: 'formula'
  formula: {
    type: string
    number: number
  }
}

export type FormulaPagePropertyResponseSimplified = number

export class FormulaPageProperty {
  public readonly id: string
  public readonly type = 'formula'
  public readonly formula: {
    type: string
    number: number
  }

  constructor(formulaPagePropertyResponse: FormulaPagePropertyResponse) {
    this.id = formulaPagePropertyResponse.id
    this.formula = formulaPagePropertyResponse.formula
  }

  toJSON(): FormulaPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      formula: this.formula
    }
  }

  simplify(): FormulaPagePropertyResponseSimplified {
    return this.formula.number
  }
}
