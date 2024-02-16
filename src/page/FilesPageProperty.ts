// @see https://developers.notion.com/reference/page-property-values#files

import { type FileResponse } from '../other'

export interface FilesPagePropertyResponse {
  id: string
  type: 'files'
  files: FileResponse
}

export class FilesPageProperty {
  private readonly id: string
  private readonly type = 'files'
  private readonly files: FileResponse

  constructor(filesPagePropertyResponse: FilesPagePropertyResponse) {
    this.id = filesPagePropertyResponse.id
    this.files = filesPagePropertyResponse.files
  }
}
