// @see https://developers.notion.com/reference/block#synced-block
import { type BlockClient } from '../client/BlockClient'
import { type DeepPartial } from '../utils'
import {
  Block,
  type DeepPartialBlockResponseArray,
  type BlockResponse
} from './Block'

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

  public readonly notion: BlockClient

  constructor(syncedBlockResponse: SyncedBlockResponse, notion: BlockClient) {
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
    const data = await this.notion.children({
      id: this.synced_block.synced_from?.block_id ?? this.id
    })
    const HTMLPromises = data.results.map(async (item) => await item.toHTML())
    const HTML = await Promise.all(HTMLPromises)
    return HTML.join('')
  }
}

/**
 * When creating a new synchronization block, please do not pass an id as the second argument.
 * To synchronize with an existing synchronization block, pass the target id as the second argument.
 *
 * @param {DeepPartialBlockResponseArray} children
 * @param {DeepPartialBlockResponseArray} id
 * @returns {DeepPartial<SyncedBlockResponse>}
 */
export const syncedBlock = (
  children: DeepPartialBlockResponseArray,
  id?: string
): DeepPartial<SyncedBlockResponse> => {
  return {
    type: 'synced_block',
    synced_block: {
      synced_from: id != null ? { block_id: id } : null,
      children: children ?? []
    }
  }
}
