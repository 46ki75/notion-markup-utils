import { notion } from './Client'

void (async () => {
  try {
    const id = String(process.env.NOTION_PAGE_ID)
    const res = await notion.blocksChildren(id)
    const data = await res.toHTML()
    console.dir(data, { depth: null })
  } catch (error) {
    console.error(error)
  }
})()
