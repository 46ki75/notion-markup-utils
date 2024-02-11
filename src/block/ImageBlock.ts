// @see https://developers.notion.com/reference/block#image
import { File, type FileResponse } from '../other'
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

  constructor(imageBlockResponse: ImageBlockResponse) {
    super(imageBlockResponse)
    this.image = new File(imageBlockResponse.image)
  }
}
