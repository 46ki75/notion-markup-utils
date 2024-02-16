import axios, { type AxiosInstance } from 'axios'
import NodeCache from 'node-cache'
import 'dotenv/config'
import { BlockList, type BlockListResponse } from './block'

export class NotionClient {
  private readonly client: AxiosInstance
  private readonly cache: NodeCache

  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: { NOTION_API_KEY?: string; stdTTL?: number } = {}) {
    if (!(process.env.NOTION_API_KEY != null)) {
      throw new Error('NOTION_API_KEY is not set')
    }
    this.client = axios.create({
      baseURL: 'https://api.notion.com',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    })

    this.cache = new NodeCache({ stdTTL })
  }

  get<T = Record<string, unknown>>(key: string): T | undefined {
    const cachedResponse = this.cache.get<T>(key)
    if (cachedResponse != null) return cachedResponse
    return undefined
  }

  set<T = Record<string, unknown>>(key: string, data: T): void {
    this.cache.set(key, data)
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
  async blocksChildren(
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
      const recursiveResult = await this.blocksChildren(id, {
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
    const blockList = await this.blocksChildren(id, {
      forceRefresh: options.forceRefresh,
      recursive: true
    })
    const HTML = await blockList.toHTML()
    return HTML
  }
}

export const notion = new NotionClient()
