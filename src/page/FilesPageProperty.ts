// @see https://developers.notion.com/reference/page-property-values#files

import { File, type FileResponse } from '../other'

export interface FilesPagePropertyResponse {
  id: string
  type: 'files'
  files: FileResponse[]
}

export type FilesPagePropertyResponseSimplified = string[]

export class FilesPageProperty {
  public readonly id: string
  public readonly type = 'files'
  public readonly files: File[]

  constructor(filesPagePropertyResponse: FilesPagePropertyResponse) {
    this.id = filesPagePropertyResponse.id
    this.files = filesPagePropertyResponse.files.map((file) => new File(file))
  }

  toJSON(): FilesPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      files: this.files.map((file) => file.toJSON())
    }
  }

  /**
   * Return an array of strings containing the URLs of the uploaded files.
   * If no files have been uploaded, return an empty array.
   * The URLs are AWS S3 signed URLs, which expire after one hour.
   *
   * @returns FilesPagePropertyResponseSimplified = **`string[]`**
   */
  simplify(): FilesPagePropertyResponseSimplified {
    return this.files.map((file) => file.simplify())
  }
}
