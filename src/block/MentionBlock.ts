// @see https://developers.notion.com/reference/block#mention
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'
import { type RichTextMentionResponseMention } from './RichText'

export interface MentionBlockResponse extends BlockResponse {
  type: 'mention'
  mention: RichTextMentionResponseMention
}

export class MentionBlock extends Block {
  public readonly type = 'mention'
  public readonly mention: RichTextMentionResponseMention

  constructor(
    mentionBlockResponse: MentionBlockResponse,
    notion: NotionClient
  ) {
    super(mentionBlockResponse, notion)
    this.mention = { ...mentionBlockResponse.mention }
  }
}
