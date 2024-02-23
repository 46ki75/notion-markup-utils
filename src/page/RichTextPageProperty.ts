// @see https://developers.notion.com/reference/page-property-values#rich-text

import { type RichTextResponse, RichText } from '../block'

export interface RichTextPagePropertyResponse {
  id: string
  type: 'rich_text'
  rich_text: RichTextResponse[]
}

export type RichTextPagePropertyResponseSimplified = string

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

  toJSON(): RichTextPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      rich_text: this.rich_text.map((text) => text.toJSON())
    }
  }

  simplify(): RichTextPagePropertyResponseSimplified {
    return this.rich_text.map((text) => text.toPlainText()).join('')
  }
}
