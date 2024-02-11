// @see https://developers.notion.com/reference/block#synced-block
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

  constructor(syncedBlockResponse: SyncedBlockResponse) {
    super(syncedBlockResponse)
    this.synced_block = {
      ...syncedBlockResponse.synced_block,
      children: syncedBlockResponse.synced_block.children?.map(
        (child) => new Block(child)
      )
    }
  }
}
