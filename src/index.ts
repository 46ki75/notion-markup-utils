import { NotionClient } from './client/NotionClient'

export * from './client/ClientBase'
export * from './block'
export * from './other'

void (async () => {
  const client = new NotionClient()
  console.log(await client.blocks.getHTML('d0ab2086289f4525b27df91fb2f41369'))
})()
