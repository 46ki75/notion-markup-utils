// @see https://developers.notion.com/reference/page-property-values#title

import {
  RichText,
  type RichTextRequestBuilder,
  type RichTextResponse
} from '../block'
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

/**
 *
 * You can use TitlePagePropertyResponse when creating it.
 * The argument can be a `string`, `RichTextRequestBuilder`,
 * or an array of `RichTextRequestBuilder[]`. The specific usage is as follows.
 *
 * The usage is the same for notion.page.update as well.
 *
 * ### string
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXXXXXXXXXX' },
 *   properties: {
 *     title: p.title('My Title')
 *   }
 * })
 * ```
 *
 * ### RichTextRequestBuilder
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXXXXXXXXXX' },
 *   properties: {
 *     title: p.title(r('My Title'))
 *   }
 * })
 * ```
 *
 * ### RichTextRequestBuilder[]
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXXXXXXXXXX' },
 *   properties: {
 *     title: p.title([r('My').bold(), r(' '), r('Title')])
 *   }
 * })
 * ```
 */
export const title = (
  title: string | RichTextRequestBuilder | RichTextRequestBuilder[]
): DeepPartial<TitlePagePropertyResponse> => {
  if (typeof title === 'string') {
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
  } else if (Array.isArray(title)) {
    return {
      type: 'title',
      title: title.map((text) => text.build())
    }
  } else {
    return {
      type: 'title',
      title: [title.build()]
    }
  }
}
