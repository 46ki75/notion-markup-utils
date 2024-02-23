// @see https://developers.notion.com/reference/page-property-values#files

import { File, type FileResponse } from '../other'

export interface FilesPagePropertyResponse {
  id: string
  type: 'files'
  files: FileResponse
}

export type FilesPagePropertyResponseSimplified = string

export class FilesPageProperty {
  private readonly id: string
  private readonly type = 'files'
  private readonly files: File

  constructor(filesPagePropertyResponse: FilesPagePropertyResponse) {
    this.id = filesPagePropertyResponse.id
    this.files = new File(filesPagePropertyResponse.files)
  }

  toJSON(): FilesPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      files: this.files.toJSON()
    }
  }

  simplify(): FilesPagePropertyResponseSimplified {
    return this.files.simplify()
  }
}
