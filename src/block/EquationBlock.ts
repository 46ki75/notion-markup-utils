// @see https://developers.notion.com/reference/block#equation
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'

export interface EquationBlockResponse extends BlockResponse {
  type: 'equation'
  equation: {
    expression: string
  }
}

export class EquationBlock extends Block {
  public readonly type = 'equation'
  public readonly equation: {
    expression: string
  }

  constructor(
    equationBlockResponse: EquationBlockResponse,
    notion: BlockClient
  ) {
    super(equationBlockResponse, notion)
    this.equation = { expression: equationBlockResponse.equation.expression }
  }
}
