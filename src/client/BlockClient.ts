import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'
import { BlockList, type BlockListResponse } from '../block'

export class BlockClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  /**
   * ## Retrieve block children
   *
   * @see https://developers.notion.com/reference/get-block-children
   *
   * @param id
   * @param options
   * @returns
   */
  async children(
    id: string,
    options: {
      forceRefresh: boolean
      recursive: boolean
      nextCursor?: string
    } = {
      forceRefresh: false,
      recursive: true
    }
  ): Promise<BlockList> {
    const url =
      `/v1/blocks/${id}/children?page_size=100` +
      (options.nextCursor != null ? `&start_cursor=${options.nextCursor}` : '')

    if (!options?.forceRefresh) {
      const cacheRes = this.cache.get<BlockListResponse>(url)
      if (cacheRes != null) return new BlockList(cacheRes, this)
    }

    const res = await this.client.get(url)
    const { data }: { data: BlockListResponse } = res

    if (data.next_cursor != null) {
      const recursiveResult = await this.children(id, {
        forceRefresh: options.forceRefresh,
        recursive: true,
        nextCursor: data.next_cursor
      })
      for (const result of recursiveResult.results) {
        data.results.push(result.toJSON())
      }
    }

    this.set(url, data)
    return new BlockList(data, this)
  }

  async getHTML(
    id: string,
    options: {
      forceRefresh: boolean
    } = {
      forceRefresh: false
    }
  ): Promise<string> {
    const blockList = await this.children(id, {
      forceRefresh: options.forceRefresh,
      recursive: true
    })
    const HTML = await blockList.toHTML()
    return HTML
  }
}
