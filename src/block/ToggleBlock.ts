// @see https://developers.notion.com/reference/block#toggle-blocks
import { type NotionClient } from '../Client'
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

  constructor(
    toggleBlockResponse: ToggleBlockResponse,
    private readonly notion: NotionClient
  ) {
    super(toggleBlockResponse, notion)
    this.toggle = {
      ...toggleBlockResponse.toggle,
      rich_text: toggleBlockResponse.toggle.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      children: toggleBlockResponse.toggle.children?.map(
        (child) => new Block(child, notion)
      )
    }
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.blocksChildren(this.id)

    const summaryPromises = this.toggle.rich_text.map(
      async (item) => await item.toHTML()
    )
    const summary = await Promise.all(summaryPromises)

    const details = await data.toHTML()

    const HTML = `<details class='notion-toggle-block'><summary class='notion-toggle-block-header'>${summary.join('')}</summary>${details}</details>`
    return HTML
  }
}
