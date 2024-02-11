import { expect, test, describe, beforeEach } from 'vitest'
import { NotionClient } from './Client'
import NodeCache from 'node-cache'

describe('NotionClient initialization', () => {
  test('throws an error if environment variables are not set', () => {
    const originalEnv = process.env.NOTION_API_KEY
    delete process.env.NOTION_API_KEY
    expect(() => new NotionClient()).toThrow('NOTION_API_KEY is not set')
    process.env.NOTION_API_KEY = originalEnv
  })
  test('initializes correctly if environment variables are set', () => {
    process.env.NOTION_API_KEY = 'test_api_key'
    expect(() => new NotionClient()).not.toThrow()
  })
})

describe('NotionClient', () => {
  let notionClient: NotionClient

  beforeEach(() => {
    process.env.NOTION_API_KEY = 'test_api_key'
    notionClient = new NotionClient()
  })

  test('client field should have get method (indirect test for AxiosInstance)', () => {
    const clientField = Reflect.get(notionClient, 'client')
    expect(typeof clientField.get).toBe('function')
  })

  test('has a cache field of type NodeCache', () => {
    const cacheField = Reflect.get(notionClient, 'cache')
    expect(cacheField).toBeInstanceOf(NodeCache)
  })
})
