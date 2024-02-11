// @see https://developers.notion.com/reference/file-object

import { type RichTextResponse } from '../block'

export type FileResponse = FileFileResponse | FileExternalResponse

export class File {
  public readonly type: 'file' | 'external'
  public readonly caption: RichTextResponse[]
  public readonly file?: {
    url: string
    expiry_time?: string
  }

  public readonly external?: {
    url: string
  }

  constructor(fileResponse: FileResponse) {
    this.type = fileResponse.type
    this.caption = fileResponse.caption
    if (this.type === 'file' && 'file' in fileResponse) {
      this.file = {
        url: fileResponse.file.url,
        expiry_time: fileResponse.file.expiry_time
      }
    } else if (this.type === 'external' && 'external' in fileResponse) {
      this.external = {
        url: fileResponse.external.url
      }
    }
  }
}

export interface FileBase {
  type: 'file' | 'external'
  caption: RichTextResponse[]
}

export interface FileFileResponse extends FileBase {
  type: 'file'
  file: {
    url: string
    expiry_time: string
  }
}

export interface FileExternalResponse extends FileBase {
  type: 'external'
  external: {
    url: string
  }
}
