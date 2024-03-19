import {
  type PageResponse,
  Page,
  type PageCreateRequest,
  type BlockRequest
} from '../page/Page'
import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'

export class PageClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  async retrieve(params: {
    id: string
    forceRefresh?: boolean
  }): Promise<Page> {
    const url = `/v1/pages/${params.id}`

    // if (!(params?.forceRefresh ?? false)) {
    //   const cacheRes = this.cache.get<PageResponse>(url)
    //   if (cacheRes != null) return new Page(cacheRes)
    // }

    const res = await this.client.get(url)
    const { data }: { data: PageResponse } = res

    this.set(url, data)
    return new Page(data)
  }

  /**
   *
   * @see https://developers.notion.com/reference/post-page
   * @param params
   */
  async create(params: PageCreateRequest): Promise<PageResponse> {
    const url = `/v1/pages`

    // Blocks can only add up to 100 pieces per request
    if (params.children != null && params.children.length > 100) {
      const childrenArray: BlockRequest[][] = []
      for (let i = 0; i < params.children.length; i += 100) {
        const chunk = params.children.slice(i, i + 100)
        childrenArray.push(chunk)
      }

      const res = await this.client.post<PageResponse>(url, {
        ...params,
        children: childrenArray.shift()
      })

      for (const children of childrenArray) {
        const url = `/v1/blocks/${res.data.id}/children`
        await this.client.patch(url, { children })
      }

      return res.data
    } else {
      const res = await this.client.post<PageResponse>(url, params)
      return res.data
    }
  }
}
