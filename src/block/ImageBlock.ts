// @see https://developers.notion.com/reference/block#image
import { type BlockClient } from '../client/BlockClient'
import { File, type FileResponse } from '../other'
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'

export interface ImageBlockResponse extends BlockResponse {
  type: 'image'
  image: FileResponse
}

/**
 * ## Supported image types
 * The image must be directly hosted.
 * In other words, the url cannot point to a service that retrieves the image.
 *
 * The following image types are supported:
 *
 * - `.bmp`
 * - `.gif`
 * - `.heic`
 * - `.jpeg`
 * - `.jpg`
 * - `.png`
 * - `.svg`
 * - `.tif`
 * - `.tiff`
 */
export class ImageBlock extends Block {
  public readonly type = 'image'
  public readonly image: File

  constructor(imageBlockResponse: ImageBlockResponse, notion: BlockClient) {
    super(imageBlockResponse, notion)
    this.image = new File(imageBlockResponse.image)
  }

  async toHTML(): Promise<string> {
    return `<img src='${this.image.file?.url ?? this.image.external?.url}' alt='' class='notion-image' />`
  }
}

export const image = (url: string): DeepPartial<ImageBlockResponse> => ({
  type: 'image',
  image: {
    type: 'external',
    external: { url }
  }
})
