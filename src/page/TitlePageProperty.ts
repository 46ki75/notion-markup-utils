// @see https://developers.notion.com/reference/page-property-values#title

import { RichText, type RichTextResponse } from '../block'

export interface TitlePagePropertyResponse {
  id: string
  type: 'title'
  title: RichTextResponse[]
}

export class TitlePageProperty {
  private readonly id: string
  private readonly type = 'title'
  private readonly title: RichText[]

  constructor(itlePagePropertyResponse: TitlePagePropertyResponse) {
    this.id = itlePagePropertyResponse.id
    this.title = itlePagePropertyResponse.title.map(
      (text) => new RichText(text)
    )
  }
}
