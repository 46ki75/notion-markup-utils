import axios, { type AxiosInstance } from 'axios'
import NodeCache from 'node-cache'
import 'dotenv/config'

export interface NotionClientArgs {
  NOTION_API_KEY?: string
  stdTTL?: number
}

export class ClientBase {
  protected readonly client: AxiosInstance
  protected readonly cache: NodeCache

  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    if (!(NOTION_API_KEY != null)) {
      throw new Error('NOTION_API_KEY is not set')
    }
    this.client = axios.create({
      baseURL: 'https://api.notion.com',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    })

    this.cache = new NodeCache({ stdTTL })
  }

  protected get<T = Record<string, unknown>>(key: string): T | undefined {
    const cachedResponse = this.cache.get<T>(key)
    if (cachedResponse != null) return cachedResponse
    return undefined
  }

  protected set<T = Record<string, unknown>>(key: string, data: T): void {
    this.cache.set(key, data)
  }
}
