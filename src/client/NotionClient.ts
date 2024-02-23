import { BlockClient } from './BlockClient'
import { PageClient } from './PageClient'
import { type NotionClientArgs } from './ClientBase'

export class NotionClient {
  public readonly blocks: BlockClient
  public readonly pages: PageClient

  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    this.blocks = new BlockClient({ NOTION_API_KEY, stdTTL })
    this.pages = new PageClient({ NOTION_API_KEY, stdTTL })
  }
}
