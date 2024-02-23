import { BlockClient } from './BlockClient'
import { type NotionClientArgs } from './ClientBase'

export class NotionClient {
  public readonly blocks: BlockClient

  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    this.blocks = new BlockClient({ NOTION_API_KEY, stdTTL })
  }
}
