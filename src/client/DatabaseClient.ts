import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'
import { type PageListResponse, PageList } from '../database/PageList'
import { type DatabaseResponse, Database } from '../database/Database'

export class DatabaseClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  async query(
    id: string,
    options: {
      forceRefresh?: boolean
      recursive?: boolean
      nextCursor?: string
    } = {
      forceRefresh: false,
      recursive: true
    }
  ): Promise<PageList> {
    const url = `/v1/databases/${id}/query`

    if (!(options?.forceRefresh ?? false)) {
      const cacheRes = this.cache.get<PageListResponse>(url)
      if (cacheRes != null) return new PageList(cacheRes)
    }

    const requestBody: { page_size: number; start_cursor?: string } = {
      page_size: 100
    }
    if (options.nextCursor != null)
      requestBody.start_cursor = options.nextCursor

    const res = await this.client.post(url, requestBody)
    const { data }: { data: PageListResponse } = res

    if (data.next_cursor != null) {
      const recursiveResult = await this.query(id, {
        forceRefresh: options.forceRefresh,
        recursive: true,
        nextCursor: data.next_cursor
      })
      for (const result of recursiveResult.results) {
        data.results.push(result.toJSON())
      }
    }

    this.set(url, data)
    return new PageList(data)
  }

  async retrieve(
    id: string,
    options: {
      forceRefresh?: boolean
    } = {
      forceRefresh: false
    }
  ): Promise<Database> {
    const url = `/v1/databases/${id}`

    if (!(options?.forceRefresh ?? false)) {
      const cacheRes = this.cache.get<DatabaseResponse>(url)
      if (cacheRes != null) return new Database(cacheRes)
    }

    const res = await this.client.get(url)
    const { data }: { data: DatabaseResponse } = res

    this.set(url, data)
    return new Database(data)
  }
}
