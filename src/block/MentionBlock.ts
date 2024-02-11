// @see https://developers.notion.com/reference/block#mention
import { Block, type BlockResponse } from './Block'
import { type RichTextMentionResponseMention } from './RichText'

export interface MentionBlockResponse extends BlockResponse {
  type: 'mention'
  mention: RichTextMentionResponseMention
}

export class MentionBlock extends Block {
  public readonly type = 'mention'
  public readonly mention: RichTextMentionResponseMention

  constructor(mentionBlockResponse: MentionBlockResponse) {
    super(mentionBlockResponse)
    this.mention = { ...mentionBlockResponse.mention }
  }
}
