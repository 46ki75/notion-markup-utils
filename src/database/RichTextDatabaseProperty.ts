// @see https://developers.notion.com/reference/property-object#rich-text

import { RichText, type RichTextResponse } from '../block'

export interface RichTextDatabasePropertyResponse {
  id: string
  name: string
  type: 'rich_text'
  rich_text: RichTextResponse[]
}

export class RichTextDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'rich_text'
  public readonly rich_text: RichText[]

  constructor(
    richTextDatabasePropertyResponse: RichTextDatabasePropertyResponse
  ) {
    this.id = richTextDatabasePropertyResponse.id
    this.name = richTextDatabasePropertyResponse.name
    this.type = richTextDatabasePropertyResponse.type
    this.rich_text = richTextDatabasePropertyResponse.rich_text.map(
      (text) => new RichText(text)
    )
  }

  toJSON(): RichTextDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      rich_text: this.rich_text.map((text) => text.toJSON())
    }
  }
}
