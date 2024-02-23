// @see https://developers.notion.com/reference/block#divider
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'

export interface DividerBlockResponse extends BlockResponse {
  type: 'divider'
  divider: Record<string, unknown>
}

export class DividerBlock extends Block {
  public readonly type = 'divider'
  public readonly divider: Record<string, unknown>

  constructor(dividerBlockResponse: DividerBlockResponse, notion: BlockClient) {
    super(dividerBlockResponse, notion)
    this.divider = dividerBlockResponse.divider
  }

  async toHTML(): Promise<string> {
    return `<hr class='notion-divider' />`
  }
}
