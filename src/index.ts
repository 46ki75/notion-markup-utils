import { Client } from '@notionhq/client'
import { type GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import NodeCache from 'node-cache'
import 'dotenv/config'

class NotionClientWithCache extends Client {
  readonly cache: NodeCache

  constructor(options: ConstructorParameters<typeof Client>[0]) {
    super(options)
    this.cache = new NodeCache({ stdTTL: 600 })
  }

  async getCachedPage(pageId: string): Promise<GetPageResponse> {
    const cachedPage = this.cache.get<GetPageResponse>(pageId)
    if (cachedPage != null) {
      console.log('Retrieve data from cache')
      return cachedPage
    }

    // If not in cache, get data from Notion API
    const page = await this.pages.retrieve({ page_id: pageId })

    // Store acquired data in cache
    this.cache.set(pageId, page)
    console.log('Retrieve data from Notion API and store in cache')
    return page
  }
}

const notionWithCache = new NotionClientWithCache({
  auth: process.env.NOTION_API_KEY
})

const pageId = ''
notionWithCache
  .getCachedPage(pageId)
  .then((page) => {
    console.log(page)
  })
  .catch(console.error)
