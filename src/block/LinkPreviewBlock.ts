// @see https://developers.notion.com/reference/block#link-preview
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'

export interface LinkPreviewBlockResponse extends BlockResponse {
  type: 'link_preview'
  link_preview: {
    url: string
  }
}

export class LinkPreviewBlock extends Block {
  public readonly type = 'link_preview'
  public readonly link_preview: {
    url: string
  }

  constructor(
    linkPreviewBlockResponse: LinkPreviewBlockResponse,
    notion: BlockClient
  ) {
    super(linkPreviewBlockResponse, notion)
    this.link_preview = linkPreviewBlockResponse.link_preview
  }
}
