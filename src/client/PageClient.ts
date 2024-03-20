import {
  type PageResponse,
  Page,
  type PageCreateRequest,
  type BlockRequest,
  type PageUpdateRequest
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
   * Creates a new page in a Notion workspace. This method allows for the creation of a page with various
   * properties, content (children blocks), and customization options such as an icon or cover image.
   *
   * ## Usage
   *
   * Basic page creation within a database:
   * ```ts
   * import { NotionClient, p, r } from 'notion-markup-utils'
   *
   * const notion = new NotionClient()
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   properties: {
   *     title: p.title('My Page Title'),
   *     Description: p.richText(r('description').bold()),
   *     URL: p.url('https://example.com')
   *   }
   * })
   * ```
   *
   * Adding children blocks to the page:
   * ```ts
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   properties: {
   *     title: p.title('Page With Content'),
   *     Description: p.richText('Content goes here'),
   *   },
   *   children: [
   *     // Array of block requests to add as content
   *   ]
   * })
   * ```
   *
   * Archiving a page upon creation:
   * ```ts
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   archived: true,
   *   properties: {
   *     title: p.title('Archived Page'),
   *   }
   * })
   * ```
   *
   * Setting an emoji as a page icon:
   * ```ts
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   icon: '😻',
   *   properties: {
   *     title: p.title('Page with Emoji Icon'),
   *   }
   * })
   * ```
   *
   * Setting an external link image as a page icon:
   * ```ts
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   icon: 'https://images.example.com/icon.png',
   *   properties: {
   *     title: p.title('Page with External Icon'),
   *   }
   * })
   * ```
   *
   * Specifying the cover image for a page:
   * ```ts
   * await notion.pages.create({
   *   parent: { database_id: 'XXXXXXXXXX' },
   *   cover: 'https://images.example.com/cover.png',
   *   properties: {
   *     title: p.title('Page with Cover Image'),
   *   }
   * })
   * ```
   *
   * Please note that this method does not allow editing of blocks within the page once created. You will need to use the
   * appropriate methods to add or modify content blocks after page creation.
   *
   * @see https://developers.notion.com/reference/post-page
   * @param params - The parameters for creating a new page including the parent (database or page), properties, optional children blocks, archival status, icon, and cover.
   * @returns A promise that resolves with the response data for the created page.
   */
  async create(params: PageCreateRequest): Promise<PageResponse> {
    const url = `/v1/pages`

    const request = {}

    if (params.properties != null) {
      Object.assign(request, { properties: params.properties })
    }

    if (params.archived != null) {
      Object.assign(request, { archived: params.archived })
    }

    if (params.icon != null) {
      if (Array.from(params.icon).length === 1) {
        Object.assign(request, {
          icon: { type: 'emoji', emoji: params.icon }
        })
      } else {
        Object.assign(request, {
          icon: { type: 'external', external: { url: params.icon } }
        })
      }
    }

    if (params.cover != null) {
      Object.assign(request, {
        cover: { type: 'external', external: { url: params.cover } }
      })
    }

    // Blocks can only add up to 100 pieces per request
    if (params.children != null && params.children.length > 100) {
      const childrenArray: BlockRequest[][] = []
      for (let i = 0; i < params.children.length; i += 100) {
        const chunk = params.children.slice(i, i + 100)
        childrenArray.push(chunk)
      }

      const res = await this.client.post<PageResponse>(url, {
        ...request,
        parent: params.parent,
        children: childrenArray.shift()
      })

      for (const children of childrenArray) {
        const url = `/v1/blocks/${res.data.id}/children`
        await this.client.patch(url, { children })
      }

      return res.data
    } else {
      const res = await this.client.post<PageResponse>(url, {
        ...request,
        parent: params.parent,
        properties: params.properties
      })
      return res.data
    }
  }

  /**
   * Please note that this method does not allow editing of blocks within the page.
   *
   * ## Usage
   * Only include the parts you want to update in the request
   * ```ts
   * await notion.pages.update({
   *   page_id: 'XXXXXXXXXX',
   *   properties: {
   *     title: p.title('My Page Title'),
   *     Description: p.richText('description'),
   *     URL: p.url('https://example.com')
   *   }
   * })
   * ```
   *
   * ---
   *
   * If you want to archive a page:
   * ```ts
   * await notion.pages.update({
   *   page_id: 'XXXXXXXXXX',
   *   archived: true
   * })
   * ```
   *
   * ---
   *
   * If setting an emoji as an icon:
   * ```ts
   * await notion.pages.update({
   *   page_id: 'XXXXXXXXXX',
   *   icon: '😻'
   * })
   * ```
   *
   * ---
   *
   * If setting an external link image as an icon:
   * ```ts
   * await notion.pages.update({
   *   page_id: 'XXXXXXXXXX',
   *   icon: 'https://images.example.com/**********'
   * })
   * ```
   *
   * ---
   *
   * If you want to specify the cover image for a page:
   * ```ts
   * await notion.pages.update({
   *   page_id: 'XXXXXXXXXX',
   *   cover: 'https://images.example.com/**********'
   * })
   * ```
   *
   */
  async update(params: PageUpdateRequest): Promise<PageResponse> {
    const url = `/v1/pages/${params.page_id}`

    const request = {}

    if (params.properties != null) {
      Object.assign(request, { properties: params.properties })
    }

    if (params.archived != null) {
      Object.assign(request, { archived: params.archived })
    }

    if (params.icon != null) {
      if (Array.from(params.icon).length === 1) {
        Object.assign(request, { icon: { type: 'emoji', emoji: params.icon } })
      } else {
        Object.assign(request, {
          icon: { type: 'external', external: { url: params.icon } }
        })
      }
    }

    if (params.cover != null) {
      Object.assign(request, {
        cover: { type: 'external', external: { url: params.cover } }
      })
    }

    const res = await this.client.patch<PageResponse>(url, request)

    return res.data
  }
}
