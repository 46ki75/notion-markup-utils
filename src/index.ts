import axios from 'axios'
import 'dotenv/config'
import { BlockList, type BlockListResponse } from './block'

const notion = axios.create({
  baseURL: 'https://api.notion.com',
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': '2022-06-28'
  }
})

void (async () => {
  try {
    const res = await notion.get(
      `/v1/blocks/${process.env.NOTION_PAGE_ID}/children?page_size=100`
    )
    const { data }: { data: BlockListResponse } = res
    const blockList = new BlockList(data)
    console.dir(blockList, { depth: null })
  } catch (error) {
    console.error(error)
  }
})()
