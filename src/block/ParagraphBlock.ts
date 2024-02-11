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

  constructor(paragraphBlock: ParagraphBlockResponse) {
    super(paragraphBlock)
    this.paragraph = {
      rich_text: paragraphBlock.paragraph.rich_text.map(
        (item) => new RichText(item)
      ),
      color: paragraphBlock.paragraph.color
    }
  }
}
