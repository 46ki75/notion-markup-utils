// @see https://developers.notion.com/reference/page-property-values#title

import { RichText, type RichTextResponse } from '../block'
import { type DeepPartial } from '../utils'

export interface TitlePagePropertyResponse {
  id: string
  type: 'title'
  title: RichTextResponse[]
}

export type TitlePagePropertyResponseSimplified = string

export class TitlePageProperty {
  public readonly id: string
  public readonly type = 'title'
  public readonly title: RichText[]

  constructor(itlePagePropertyResponse: TitlePagePropertyResponse) {
    this.id = itlePagePropertyResponse.id
    this.title = itlePagePropertyResponse.title.map(
      (text) => new RichText(text)
    )
  }

  toJSON(): TitlePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      title: this.title.map((text) => text.toJSON())
    }
  }

  simplify(): TitlePagePropertyResponseSimplified {
    return this.title.map((text) => text.toPlainText()).join('')
  }
}

export const title = (
  title: string
): DeepPartial<TitlePagePropertyResponse> => {
  return {
    type: 'title',
    title: [
      {
        type: 'text',
        text: {
          content: title
        }
      }
    ]
  }
}
