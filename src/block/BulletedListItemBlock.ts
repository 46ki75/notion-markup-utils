// @see https://developers.notion.com/reference/block#bulleted-list-item
import { type RichTextResponse, type BlockResponse, Block, RichText } from '.'
import { type Color } from '../other'

export interface BulletedListItemBlockResponse extends BlockResponse {
  type: 'bulleted_list_item'
  bulleted_list_item: {
    rich_text: RichTextResponse[]
    color: Color
    children: BlockResponse[]
  }
}

export class BulletedListItemBlock extends Block {
  public readonly type = 'bulleted_list_item'
  public readonly bulleted_list_item: {
    rich_text: RichText[]
    color: Color
    children: Block[]
  }

  constructor(bulletedListItemBlockResponse: BulletedListItemBlockResponse) {
    super(bulletedListItemBlockResponse)
    this.bulleted_list_item = {
      rich_text: bulletedListItemBlockResponse.bulleted_list_item.rich_text.map(
        (item) => new RichText(item)
      ),
      color: bulletedListItemBlockResponse.bulleted_list_item.color,
      children: bulletedListItemBlockResponse.bulleted_list_item.children.map(
        (block) => new Block(block)
      )
    }
  }
}
