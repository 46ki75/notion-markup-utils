// @see https://developers.notion.com/reference/block#callout
import { type BlockClient } from '../client/BlockClient'
import {
  File,
  type Color,
  Emoji,
  type FileResponse,
  type EmojiResponse
} from '../other'
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'
import {
  RichText,
  r,
  type RichTextRequestBuilder,
  type RichTextResponse
} from './RichText'

export interface CalloutBlockResponse extends BlockResponse {
  type: 'callout'
  callout: {
    rich_text: RichTextResponse[]
    icon: EmojiResponse | FileResponse
    color: Color
  }
}

export class CalloutBlock extends Block {
  public readonly type = 'callout'
  public readonly callout: {
    rich_text: RichText[]
    icon: Emoji | File
    color: Color
  }

  constructor(calloutBlockRespose: CalloutBlockResponse, notion: BlockClient) {
    super(calloutBlockRespose, notion)
    this.callout = {
      rich_text: calloutBlockRespose.callout.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      icon:
        calloutBlockRespose.callout.icon.type === 'emoji'
          ? new Emoji(calloutBlockRespose.callout.icon)
          : new File(calloutBlockRespose.callout.icon),
      color: calloutBlockRespose.callout.color
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.callout.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<div class='notion-callout ${HTML.join('')}</div>`
  }
}

/**
 *
 * ### Usage:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.callout(r('Notice!').bold(), 'yellow_background')]
 * })
 * ```
 *
 * ### With Color:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.callout('Notice!', 'yellow_background')]
 * })
 * ```
 *
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} text Text of the callout
 * @param {Color} color Color of the callout block
 * @returns {DeepPartial<BulletedListItemBlockResponse>} Objects that can be used to create a Notion Block
 */
export const callout = (
  text: string | RichTextRequestBuilder[] | RichTextRequestBuilder,
  color?: Color
): DeepPartial<CalloutBlockResponse> => ({
  type: 'callout',
  callout: {
    rich_text:
      text != null
        ? Array.isArray(text)
          ? text.map((t) => t.build())
          : typeof text === 'string'
            ? [r(text).build()]
            : [text.build()]
        : [],
    color: color ?? 'default'
  }
})
