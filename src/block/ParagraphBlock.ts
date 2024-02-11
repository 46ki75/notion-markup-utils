import { type NotionClient } from '../Client'
import { Block, RichText, type BlockResponse, type RichTextResponse } from '.'
import { type Color } from '../other'

export interface ParagraphBlockResponse extends BlockResponse {
  type: 'paragraph'
  paragraph: {
    rich_text: RichTextResponse[]
    color: Color
  }
}

export class ParagraphBlock extends Block {
  public readonly type = 'paragraph'
  public readonly paragraph: {
    rich_text: RichText[]
    color: Color
  }

  constructor(paragraphBlock: ParagraphBlockResponse, notion: NotionClient) {
    super(paragraphBlock, notion)
    this.paragraph = {
      rich_text: paragraphBlock.paragraph.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      color: paragraphBlock.paragraph.color
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.paragraph.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<p class='notion-paragraph'>${HTML.join('')}</p>`
  }
}
