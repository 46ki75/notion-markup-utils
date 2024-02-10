import { Client } from './Client'

const notionWithCache = new Client({
  auth: process.env.NOTION_API_KEY
})

const pageId = String(process.env.NOTION_PAGE_ID)

notionWithCache.withCache.blocks.children
  .list(pageId)
  .then((page) => {
    console.log(page.results[0])
  })
  .catch(console.error)
