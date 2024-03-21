import { BlockClient } from './BlockClient'
import { PageClient } from './PageClient'
import { type NotionClientArgs } from './ClientBase'
import { DatabaseClient } from './DatabaseClient'

export class NotionClient {
  public readonly blocks: BlockClient
  public readonly pages: PageClient
  public readonly databases: DatabaseClient

  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 0
  }: NotionClientArgs = {}) {
    this.blocks = new BlockClient({ NOTION_API_KEY, stdTTL })
    this.pages = new PageClient({ NOTION_API_KEY, stdTTL })
    this.databases = new DatabaseClient({ NOTION_API_KEY, stdTTL })
  }
}
