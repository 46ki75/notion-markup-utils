// see @https://developers.notion.com/reference/emoji-object

export interface EmojiResponse {
  /**
   * The constant string "emoji" that represents the object type.
   */
  type: 'emoji'

  /**
   * The emoji character.
   */
  emoji: string
}

export class Emoji {
  public readonly type = 'emoji'
  public readonly emoji: string

  constructor(emojiResponse: EmojiResponse) {
    this.emoji = emojiResponse.emoji
  }
}
