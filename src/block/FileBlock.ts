// @see https://developers.notion.com/reference/block#file
import { type NotionClient } from '../Client'
import { type FileResponse, File } from '../other'
import { Block, type BlockResponse } from './Block'

export interface FileBlockResponse extends BlockResponse {
  type: 'file'
  file: FileResponse
}

export class FileBlock extends Block {
  public readonly type: 'file'
  public readonly file: File

  constructor(fileBlockResponse: FileBlockResponse, notion: NotionClient) {
    super(fileBlockResponse, notion)
    this.type = fileBlockResponse.type
    this.file = new File(fileBlockResponse.file)
  }
}
