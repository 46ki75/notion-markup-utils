import { type PageResponse, Page } from '../page/Page'
import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'

export class PageClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  async retrieve(
    id: string,
    options: {
      forceRefresh: boolean
    } = {
      forceRefresh: false
    }
  ): Promise<Page> {
    const url = `/v1/pages/${id}`

    if (!options?.forceRefresh) {
      const cacheRes = this.cache.get<PageResponse>(url)
      if (cacheRes != null) return new Page(cacheRes)
    }

    const res = await this.client.get(url)
    const { data }: { data: PageResponse } = res

    this.set(url, data)
    return new Page(data)
  }
}
