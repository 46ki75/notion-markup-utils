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
  async children(params: {
    id: string
    forceRefresh?: boolean
    recursive?: boolean
    nextCursor?: string
  }): Promise<BlockList> {
    const url =
      `/v1/blocks/${params.id}/children?page_size=100` +
      (params.nextCursor != null ? `&start_cursor=${params.nextCursor}` : '')

    if (!(params?.forceRefresh ?? false)) {
      const cacheRes = this.cache.get<BlockListResponse>(url)
      if (cacheRes != null) return new BlockList(cacheRes, this)
    }

    const res = await this.client.get(url)
    const { data }: { data: BlockListResponse } = res

    if (data.next_cursor != null) {
      const recursiveResult = await this.children({
        id: params.id,
        forceRefresh: params.forceRefresh,
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

  async getHTML(params: {
    id: string
    forceRefresh?: boolean
  }): Promise<string> {
    const blockList = await this.children({
      id: params.id,
      forceRefresh: params.forceRefresh ?? false,
      recursive: true
    })
    const HTML = await blockList.toHTML()
    return HTML
  }
}
