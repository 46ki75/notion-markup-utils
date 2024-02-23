// @see https://developers.notion.com/reference/block#embed
import { type BlockClient } from '../client/BlockClient'
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

  constructor(embedBlockResponse: EmbedBlockResponse, notion: BlockClient) {
    super(embedBlockResponse, notion)
    this.embed = { url: embedBlockResponse.embed.url }
  }
}
