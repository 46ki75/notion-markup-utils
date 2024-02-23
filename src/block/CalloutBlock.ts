// @see https://developers.notion.com/reference/block#callout
import { type BlockClient } from '../client/BlockClient'
import {
  File,
  type Color,
  Emoji,
  type FileResponse,
  type EmojiResponse
} from '../other'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface CalloutBlockRespose extends BlockResponse {
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

  constructor(calloutBlockRespose: CalloutBlockRespose, notion: BlockClient) {
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
