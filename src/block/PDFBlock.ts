// @see https://developers.notion.com/reference/block#pdf
import { type NotionClient } from '../Client'
import { File, type FileResponse } from '../other'
import { Block, type BlockResponse } from './Block'

export interface PDFBlockResponse extends BlockResponse {
  type: 'pdf'
  pdf: FileResponse
}

export class PDFBlock extends Block {
  public readonly type = 'pdf'
  public readonly pdf: File

  constructor(pdfBlockResponse: PDFBlockResponse, notion: NotionClient) {
    super(pdfBlockResponse, notion)
    this.pdf = new File(pdfBlockResponse.pdf)
  }
}
