// @see https://developers.notion.com/reference/block#file
import { type BlockClient } from '../client/BlockClient'
import { type FileResponse, File } from '../other'
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'

export interface FileBlockResponse extends BlockResponse {
  type: 'file'
  file: FileResponse
}

export class FileBlock extends Block {
  public readonly type: 'file'
  public readonly file: File

  constructor(fileBlockResponse: FileBlockResponse, notion: BlockClient) {
    super(fileBlockResponse, notion)
    this.type = fileBlockResponse.type
    this.file = new File(fileBlockResponse.file)
  }
}

export const file = (url: string): DeepPartial<FileBlockResponse> => ({
  type: 'file',
  file: {
    caption: [],
    type: 'external',
    external: { url }
  }
})
