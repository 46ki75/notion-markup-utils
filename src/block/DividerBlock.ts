// @see https://developers.notion.com/reference/block#divider
import { Block, type BlockResponse } from './Block'

export interface DividerBlockResponse extends BlockResponse {
  type: 'divider'
  divider: Record<string, unknown>
}

export class DividerBlock extends Block {
  public readonly type = 'divider'
  public readonly divider: Record<string, unknown>

  constructor(dividerBlockResponse: DividerBlockResponse) {
    super(dividerBlockResponse)
    this.divider = dividerBlockResponse.divider
  }
}
