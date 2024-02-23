// @see https://developers.notion.com/reference/block#bulleted-list-item
import { type RichTextResponse, type BlockResponse, Block, RichText } from '.'
import { type BlockClient } from '../client/BlockClient'
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

  constructor(
    bulletedListItemBlockResponse: BulletedListItemBlockResponse,
    public readonly notion: BlockClient
  ) {
    super(bulletedListItemBlockResponse, notion)
    this.bulleted_list_item = {
      rich_text:
        bulletedListItemBlockResponse.bulleted_list_item.rich_text?.map(
          (item) => new RichText(item) ?? []
        ),
      color: bulletedListItemBlockResponse.bulleted_list_item.color,
      children: bulletedListItemBlockResponse.bulleted_list_item.children?.map(
        (block) => new Block(block, notion) ?? []
      )
    }
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.children(this.id)

    const childrenHTML = await data.toHTML()

    const HTMLPromise = this.bulleted_list_item.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<li class='notion-bulleted-list-item'>${HTML.join('')}${childrenHTML}</li>`
  }
}
