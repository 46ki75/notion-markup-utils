// @see https://developers.notion.com/reference/block#bookmark
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

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

  constructor(bookmarkBlockResponse: BookmarkBlockResponse) {
    super(bookmarkBlockResponse)
    this.bookmark = {
      caption: bookmarkBlockResponse.bookmark.caption.map(
        (item) => new RichText(item)
      ),
      url: bookmarkBlockResponse.bookmark.url
    }
  }
}
