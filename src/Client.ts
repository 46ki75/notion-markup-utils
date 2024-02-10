import { Client as OriginalClient } from '@notionhq/client'
import {
  type ListBlockChildrenResponse,
  type GetPageResponse
} from '@notionhq/client/build/src/api-endpoints'
import NodeCache from 'node-cache'
import 'dotenv/config'

/**
 * Defines additional configuration options for the client.
 */
export interface AdditionalOptions {
  /**
   * Specifies the standard Time To Live (TTL) for cached data, in seconds.
   */
  stdTTL: number
}

export class Client extends OriginalClient {
  readonly cache: NodeCache

  /**
   * `withCache` provides a structure identical to the `@notionhq/client` Client instance, enabling return from cache.
   * For operations without cache, use methods directly under the `Client` instance.
   * To utilize caching, use methods under `Client.withCache`.
   * To purge the cache and fetch data again, set the last argument (`forceRefresh`) of the method under `Client.withCache` to `true`.
   */
  readonly withCache: {
    // # ----------------------------------------------------------------------------------------------------
    // #
    // # Blocks
    // #
    // # ----------------------------------------------------------------------------------------------------
    blocks: {
      children: {
        /**
         * ## Retrieve block children
         *
         * ENDPOINT - GET https://api.notion.com/v1/blocks/{block_id}/children
         *
         * @see https://developers.notion.com/reference/get-block-children
         *
         * @param blockId ID of block or **page**
         * @param forceRefresh If true, purge cache
         * @returns
         */
        list: (
          blockId: string,
          forceRefresh?: boolean,
          cursor?: string
        ) => Promise<ListBlockChildrenResponse>
      }
    }
    // # ----------------------------------------------------------------------------------------------------
    // #
    // # Pages
    // #
    // # ----------------------------------------------------------------------------------------------------
    pages: {
      /**
       * ## Retrieve a page
       *
       * ENDPOINT - GET https://api.notion.com/v1/pages/{page_id}
       *
       * @see https://developers.notion.com/reference/retrieve-a-page
       *
       * @param pageId
       * @param forceRefresh If true, purge cache
       * @returns
       */
      retrieve: (
        pageId: string,
        forceRefresh?: boolean
      ) => Promise<GetPageResponse>
    }
  }

  constructor(
    options: ConstructorParameters<typeof OriginalClient>[0],
    additionalOptions: AdditionalOptions = { stdTTL: 0 }
  ) {
    super(options)
    this.cache = new NodeCache({ stdTTL: additionalOptions.stdTTL })

    this.withCache = {
      blocks: {
        children: {
          list: async (
            blockId: string,
            forceRefresh: boolean = false,
            cursor?: string
          ): Promise<ListBlockChildrenResponse> => {
            console.log('called')

            const cacheKey = JSON.stringify([
              'blocks',
              'children',
              'list',
              blockId,
              cursor
            ])

            const response =
              await this.fetchWithCache<ListBlockChildrenResponse>(
                cacheKey,
                async () => {
                  const params = { block_id: blockId } as any
                  if (cursor != null) params.start_cursor = cursor
                  return await this.blocks.children.list({
                    block_id: blockId,
                    start_cursor: cursor,
                    page_size: 100
                  })
                },
                forceRefresh
              )

            // has_moreがtrueの場合、再帰的に次のデータを取得
            if (response.has_more && response.next_cursor != null) {
              const nextResponse = await this.withCache.blocks.children.list(
                blockId,
                forceRefresh,
                response.next_cursor
              )

              response.results = [...response.results, ...nextResponse.results]
            }

            return response
          }
        }
      },
      pages: {
        retrieve: async (
          pageId: string,
          forceRefresh: boolean = false
        ): Promise<GetPageResponse> => {
          const cacheKey = JSON.stringify(['pages', 'retrieve', pageId])
          return await this.fetchWithCache<GetPageResponse>(
            cacheKey,
            async () => await this.pages.retrieve({ page_id: pageId }),
            forceRefresh
          )
        }
      }
    }
  }

  /**
   * Fetches data with caching mechanism. If the data is not present in the cache or if forceRefresh is true,
   * it fetches data using the provided fetch function and updates the cache.
   *
   * @param {string} cacheKey - The key used to store the data in the cache.
   * @param {() => Promise<T>} fetchFunc - A function that fetches the data. It should return a promise that resolves to the data.
   * @param {boolean} [forceRefresh=false] - If true, the data will be fetched from the source even if it is present in the cache.
   * @returns {Promise<T>} A promise that resolves to the fetched data.
   */
  private async fetchWithCache<T>(
    cacheKey: string,
    fetchFunc: () => Promise<T>,
    forceRefresh: boolean = false
  ): Promise<T> {
    if (!forceRefresh) {
      const cachedResult = this.cache.get<T>(cacheKey)
      if (cachedResult != null) return cachedResult
    }

    const result = await fetchFunc()
    this.cache.set(cacheKey, result)
    return result
  }

  /**
   * Closes the cache instance, clearing any internal timers.
   */
  closeCache(): void {
    this.cache.close()
  }
}
