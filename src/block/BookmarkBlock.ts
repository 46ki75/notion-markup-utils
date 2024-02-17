// @see https://developers.notion.com/reference/block#bookmark
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

import { load } from 'cheerio'
import axios from 'axios'

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
    notion: NotionClient
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
