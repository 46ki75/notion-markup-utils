// @see https://developers.notion.com/reference/page-property-values#rich-text

import { type RichTextResponse, RichText } from '../block'

export interface RichTextPagePropertyResponse {
  id: string
  type: 'rich_text'
  rich_text: RichTextResponse[]
}

export class RichTextPageProperty {
  private readonly id: string
  private readonly type = 'rich_text'

  private readonly rich_text: RichText[]

  constructor(richTextPagePropertyResponse: RichTextPagePropertyResponse) {
    this.id = richTextPagePropertyResponse.id
    this.rich_text = richTextPagePropertyResponse.rich_text.map(
      (text) => new RichText(text)
    )
  }
}
