import { NotionClient } from './client/NotionClient'

export * from './client/NotionClient'
export * from './block'
export * from './other'

void (async () => {
  const notion = new NotionClient()
  const res = await notion.pages.retrieve('d0ab2086289f4525b27df91fb2f41369')
  console.log(res.properties)
})()
