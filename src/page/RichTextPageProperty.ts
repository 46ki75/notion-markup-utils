// @see https://developers.notion.com/reference/page-property-values#rich-text

import {
  type RichTextResponse,
  RichText,
  type RichTextRequestBuilder
} from '../block'
import { type RichTextDatabasePropertyResponse } from '../database'
import { type DeepPartial } from '../utils'

export interface RichTextPagePropertyResponse {
  id: string
  type: 'rich_text'
  rich_text: RichTextResponse[]
}

export type RichTextPagePropertyResponseSimplified = string

export class RichTextPageProperty {
  public readonly id: string
  public readonly type = 'rich_text'

  public readonly rich_text: RichText[]

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
 *     title: p.title('My Title'),
 *     description: p.richText('My Description')
 *   }
 * })
 * ```
 *
 * ### RichTextRequestBuilder
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXXXXXXXXXX' },
 *   properties: {
 *     title: p.title(r('My Title')),
 *     description: p.richText([('My Description'))
 *   }
 * })
 * ```
 *
 * ### RichTextRequestBuilder[]
 * ```ts
 * await notion.pages.create({
 *   parent: { database_id: 'XXXXXXXXXXXXXXXXXX' },
 *   properties: {
 *     title: p.title([r('My').bold(), r(' '), r('Title')]),
 *     description: p.richText([r('My').bold(), r(' '), r('Description')])
 *   }
 * })
 * ```
 */
export const richText = (
  text: string | RichTextRequestBuilder | RichTextRequestBuilder[]
): DeepPartial<RichTextDatabasePropertyResponse> => {
  if (typeof text === 'string') {
    return {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: text
          }
        }
      ]
    }
  } else if (Array.isArray(text)) {
    return {
      type: 'rich_text',
      rich_text: text.map((text) => text.build())
    }
  } else {
    return {
      type: 'rich_text',
      rich_text: [text.build()]
    }
  }
}
