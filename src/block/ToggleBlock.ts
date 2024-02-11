// @see https://developers.notion.com/reference/block#toggle-blocks
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface ToggleBlockResponse extends BlockResponse {
  type: 'toggle'
  toggle: {
    rich_text: RichTextResponse[]
    color: string
    children: BlockResponse[]
  }
}

export class ToggleBlock extends Block {
  public readonly type = 'toggle'
  public readonly toggle: {
    rich_text: RichText[]
    color: string
    children: Block[]
  }

  constructor(toggleBlockResponse: ToggleBlockResponse) {
    super(toggleBlockResponse)
    this.toggle = {
      ...toggleBlockResponse.toggle,
      rich_text: toggleBlockResponse.toggle.rich_text?.map(
        (item) => new RichText(item)
      ),
      children: toggleBlockResponse.toggle.children?.map(
        (child) => new Block(child)
      )
    }
  }
}
