// @see https://developers.notion.com/reference/block#embed
import { Block, type BlockResponse } from './Block'

export interface EmbedBlockResponse extends BlockResponse {
  type: 'embed'
  embed: {
    url: string
  }
}

export class EmbedBlock extends Block {
  public readonly type = 'embed'
  public readonly embed: {
    url: string
  }

  constructor(embedBlockResponse: EmbedBlockResponse) {
    super(embedBlockResponse)
    this.embed = { url: embedBlockResponse.embed.url }
  }
}
