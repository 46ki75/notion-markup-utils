import { ClientBase, type NotionClientArgs } from './ClientBase'
import 'dotenv/config'
import { type PageListResponse, PageList } from '../database/PageList'
import { type DatabaseResponse, Database } from '../database/Database'
import { type QueryFilter } from '../database/QueryFilter'
import { type QuerySort } from '../database'
import { type PageProperty } from '../page'

export class DatabaseClient extends ClientBase {
  constructor({
    NOTION_API_KEY = process.env.NOTION_API_KEY,
    stdTTL = 3600
  }: NotionClientArgs = {}) {
    super({ NOTION_API_KEY, stdTTL })
  }

  /**
   *
   * Query from the Notion database. The value returned will be the one
   * where an array of Notion's Pages is stored in the results key.
   *
   * All records are retrieved recursively by default. To perform pagination,
   * set recursive to false. Other sorting and filtering functions are also available.
   *
   * ## Basic Usage
   * ```typescript
   * // Initialise the NotionClient
   * const notion = new NotionClient()
   *
   * void (async () => {
   *   // Query by ID. In this case, sorting is done in ascending order of creation time.
   *   const response = await notion.databases.query({
   *     id: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
   *     sorts: [sorts.createdTimeAscending()]
   *   })
   *
   *   console.log(response.results)
   * })()
   * ```
   *
   * ## with type generics
   * ```ts
   *  const result = await notion.databases.query<{
   *    title: TitlePageProperty
   *    description: RichTextPageProperty
   *    tags: MultiSelectPageProperty
   *  }>({
   *    id: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
   *  })
   * ```
   *
   * @see https://developers.notion.com/reference/post-database-query
   *
   * @param params.id Database ID
   * @param params.forceRefresh Set to true to ignore cache
   * @param params.recursive By default all records are retrieved, but false for pagination.
   * @param params.nextCursor Specifies the next starting cursor when paginating.
   * @param params.page_size You can specify the number of records retrieved in a single query.
   * @param params.filter Filters can be applied to queries.
   * @param params.sort Sorting can be applied to queries.
   * @returns `Promise<PageList>` A list of Notin pages is returned.
   *
   */
  async query<
    T extends Record<string, PageProperty> = Record<string, PageProperty>
  >(params: {
    /**
     * Database ID (required)
     *
     * Examples of the simplest queries are as follows.
     * ```typescript
     * const res = await notion.databases.query({ id: 'XXXXXXXXXX' })
     * ```
     */
    id: string
    /**
     * Set to true to ignore cache.
     *
     * The following is an example of a query ignoring the cache.
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   forceRefresh: true
     * })
     * ```
     */
    forceRefresh?: boolean
    /**
     * By default, the process retrieves all queries in the database; setting it to false enables pagination.
     *
     * To avoid recursive queries, do the following
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   recursive: false
     * })
     * ```
     */
    recursive?: boolean
    /**
     * A start cursor can be specified when paginating.
     *
     * The value specified for `nextCursor` is stored
     * in the `next_cursor` of the return response of this method.
     *
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   nextCursor: 'ZZZZZZZZZZ'
     * })
     * ```
     */
    nextCursor?: string
    /**
     * You can limit the amount of data that can be retrieved in a single query.
     * When using this, also set `recursive` to `false`.
     *
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   nextCursor: 'ZZZZZZZZZZ',
     *   page_size: 10
     * })
     * ```
     */
    page_size?: number
    /**
     * You can query the database with conditions in Notion.
     *
     * ```ts
     * const notion = new NotionClient()
     * const { results } = await notion.databases.query<{
     *   title: TitlePageProperty
     *   status: StatusPageProperty
     * }>({
     *   id: 'XXXXXXXXXXXXXXXXX',
     *   filter: { and: [f.status('propertyName').equals('In progress')] }
     * })
     * ```
     */
    filter?: QueryFilter
    /**
     * Sort the data in the Notion database.
     *
     * Below is an example of displaying in descending order of creation time (latest first).
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   sorts: [
     *     s.createdTimeDescending()
     *   ]
     * })
     * ```
     *
     * The following is an example of displaying specific properties in ascending order.
     * In this example, the property deadline is in descending order.
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   sorts: [
     *     s.ascending('deadline')
     *   ]
     * })
     * ```
     *
     * Below is an example of displaying a specific property in descending order.
     * In this example, the property PRIORITY is in descending order. Furthermore,
     * if the PRI PRIORITY is the same, it is in ascending order of the DEADLINE.
     * ```typescript
     * const res = await notion.databases.query({
     *   id: 'XXXXXXXXXX',
     *   sorts: [
     *     s.descending('priority'),
     *     s.ascending('deadline')
     *   ]
     * })
     * ```
     */
    sorts?: QuerySort[]
  }): Promise<PageList<T>> {
    // Endpoint for querying database. This is also used for cache keys.
    const url = `/v1/databases/${params.id}/query`

    // If forceRefresh is false or undefined, it is taken from the cache.
    if (!(params?.forceRefresh ?? false)) {
      // Returns a value if the cache is hit
      const cacheRes = this.cache.get<PageListResponse>(url)
      if (cacheRes != null) return new PageList<T>(cacheRes)
    }

    const requestBody: {
      page_size: number
      start_cursor?: string
      filter?: QueryFilter
      sorts?: QuerySort[]
    } = {
      page_size: params.page_size ?? 100
    }
    if (params.nextCursor != null) requestBody.start_cursor = params.nextCursor
    if (params.filter != null) requestBody.filter = params.filter
    if (params.sorts != null) requestBody.sorts = params.sorts

    // Send a POST request to the endpoint and retrieve the data
    const res = await this.client.post(url, requestBody)
    const { data }: { data: PageListResponse } = res

    // Process to get results ( Array<Page> ) recursively.
    if (
      data.next_cursor != null &&
      (params.recursive === undefined || params.recursive)
    ) {
      const requestBody: {
        id: string
        forceRefresh?: boolean
        recursive?: boolean
        nextCursor?: string
        filter?: QueryFilter
        sorts?: QuerySort[]
      } = {
        id: params.id,
        forceRefresh: params.forceRefresh,
        recursive: true,
        nextCursor: data.next_cursor
      }
      if (params.filter != null) requestBody.filter = params.filter
      if (params.sorts != null) requestBody.sorts = params.sorts

      const recursiveResult = await this.query(requestBody)
      for (const result of recursiveResult.results) {
        data.results.push(result.toJSON())
      }
    }

    // set cache
    this.set(url, data)

    return new PageList<T>(data)
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  async retrieve(
    id: string,
    options: {
      forceRefresh?: boolean
    } = {
      forceRefresh: false
    }
  ): Promise<Database> {
    const url = `/v1/databases/${id}`

    if (!(options?.forceRefresh ?? false)) {
      const cacheRes = this.cache.get<DatabaseResponse>(url)
      if (cacheRes != null) return new Database(cacheRes)
    }

    const res = await this.client.get(url)
    const { data }: { data: DatabaseResponse } = res

    this.set(url, data)
    return new Database(data)
  }
}
