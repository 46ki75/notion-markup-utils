import { notion } from './Client'
export * from './Client'
export * from './block'
export * from './other'
void (async () => {
  const a = await notion.getHTML('57ca7911c60441b499d1fded6cb14b2f')
  console.log(a)
})()
