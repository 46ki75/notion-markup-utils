// @see https://developers.notion.com/reference/block#bookmark
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'
import {
  RichText,
  r,
  type RichTextResponse,
  type RichTextRequestBuilder
} from './RichText'

import { load } from 'cheerio'
import axios from 'axios'
import { type DeepPartial } from '../utils'

export interface BookmarkBlockResponse extends BlockResponse {
  type: 'bookmark'
  bookmark: {
    caption: RichTextResponse[]
    url: string
  }
}

export class BookmarkBlock extends Block {
  public readonly type = 'bookmark'
  public readonly bookmark: {
    caption: RichText[]
    url: string
  }

  constructor(
    bookmarkBlockResponse: BookmarkBlockResponse,
    notion: BlockClient
  ) {
    super(bookmarkBlockResponse, notion)
    this.bookmark = {
      caption: bookmarkBlockResponse.bookmark.caption.map(
        (item) => new RichText(item) ?? []
      ),
      url: bookmarkBlockResponse.bookmark.url
    }
  }

  async toHTML(): Promise<string> {
    const ogp = await this.fetchOGP(this.bookmark.url)

    const title = ogp.title !== '' ? ogp.title : this.bookmark.url
    const titleHTML = `<div class='notion-bookmark-title'>${title}</div>`

    const HTMLPromise = this.bookmark.caption?.map(
      async (item) => await item.toHTML()
    )
    const caption = (await Promise.all(HTMLPromise)).join('')
    const description = ogp.description !== '' ? ogp.description : caption
    const descriptionHTML = `<div class='notion-bookmark-description'>${description}</div>`

    const image = ogp.image
    const imageHTML = `<img class='notion-bookmark-image' src='${image}' alt='${description}' />`

    const captionHTML = `<div class='notion-bookmark-caption'>${titleHTML}${descriptionHTML}</div>`

    return `<a href='${this.bookmark.url}' class='notion-bookmark'>${imageHTML}${captionHTML}</a>`
  }

  async fetchOGP(
    url: string
  ): Promise<{ title: string; image: string; description: string }> {
    try {
      const { data } = await axios.get(url)
      const $ = load(String(data))

      let title = ''
      title = $('title').text()

      let image = ''
      let description = ''
      description = $('description').text()

      $('meta').each((i, el) => {
        if (
          $(el).attr('property') === 'og:title' &&
          typeof $(el).attr('content') === 'string'
        ) {
          title = String($(el).attr('content'))
        }

        if (
          $(el).attr('property') === 'og:image' &&
          typeof $(el).attr('content') === 'string'
        ) {
          image = String($(el).attr('content'))
        }

        if (
          $(el).attr('property') === 'og:description' &&
          typeof $(el).attr('content') === 'string'
        ) {
          description = String($(el).attr('content'))
        }
      })

      return { title, image, description }
    } catch (error) {
      return { title: '', image: '', description: '' }
    }
  }
}

/**
 * Create a Bookmark Block.
 *
 * ###
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.bookmark('https://example.com')]
 * })
 * ```
 *
 * ### With Caption (string)
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.bookmark('https://example.com', 'My caption')]
 * })
 * ```
 *
 * ### With Caption (RichText)
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.bookmark('https://example.com', r('My caption').bold())]
 * })
 * ```
 *
 * ### With Caption Array (RichText)
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [
 *     b.bookmark('https://example.com', [
 *       r('My ').italic(),
 *       r('caption').color('blue')
 *     ])
 *   ]
 * })
 * ```
 *
 * @param {string} url URL of the link
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} caption Caption displayed under the bookmark
 * @returns {DeepPartial<BookmarkBlockResponse>} Objects that can be used to create a Notion Block
 */
export const bookmark = (
  url: string,
  caption?: string | RichTextRequestBuilder[] | RichTextRequestBuilder
): DeepPartial<BookmarkBlockResponse> => {
  return {
    type: 'bookmark',
    bookmark: {
      caption:
        caption != null
          ? Array.isArray(caption)
            ? caption.map((text) => text.build())
            : typeof caption === 'string'
              ? [r(caption).build()]
              : [caption.build()]
          : [],
      url
    }
  }
}
