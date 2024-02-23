// @see https://developers.notion.com/reference/block#video
import { type BlockClient } from '../client/BlockClient'
import { File, type FileResponse } from '../other'
import { Block, type BlockResponse } from './Block'

export interface VideoBlockResponse extends BlockResponse {
  type: 'video'
  video: FileResponse
}

export class VideoBlock extends Block {
  public readonly type = 'video'
  public readonly video: File

  constructor(videoBlockResponse: VideoBlockResponse, notion: BlockClient) {
    super(videoBlockResponse, notion)
    this.video = new File(videoBlockResponse.video)
  }
}
