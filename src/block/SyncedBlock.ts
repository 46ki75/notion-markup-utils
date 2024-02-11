// @see https://developers.notion.com/reference/block#synced-block
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'

export interface SyncedBlockResponse extends BlockResponse {
  type: 'synced_block'
  synced_block: {
    synced_from: null | { block_id: string }
    children: BlockResponse[]
  }
}

export class SyncedBlock extends Block {
  public readonly type = 'synced_block'
  public readonly synced_block: {
    synced_from: null | { block_id: string }
    children: Block[]
  }

  private readonly notion: NotionClient

  constructor(syncedBlockResponse: SyncedBlockResponse, notion: NotionClient) {
    super(syncedBlockResponse, notion)
    this.synced_block = {
      ...syncedBlockResponse.synced_block,
      children: syncedBlockResponse.synced_block.children?.map(
        (child) => new Block(child, notion)
      )
    }
    this.notion = notion
  }

  async toHTML(): Promise<string> {
    const data = await this.notion.blocksChildren(
      this.synced_block.synced_from?.block_id ?? this.id
    )
    const HTMLPromises = data.results.map(async (item) => await item.toHTML())
    const HTML = await Promise.all(HTMLPromises)
    return HTML.join('')
  }
}
