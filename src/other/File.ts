// @see https://developers.notion.com/reference/file-object

import { type RichTextResponse } from '../block'

export type FileResponse = FileFileResponse | FileExternalResponse

export class File {
  public readonly type: 'file' | 'external'
  public readonly caption: RichTextResponse[]

  constructor(fileResponse: FileResponse) {
    this.type = fileResponse.type
    this.caption = fileResponse.caption
  }
}

export class FileFile extends File {
  public readonly type = 'file'
  public readonly file: {
    url: string
    expiry_time: string
  }

  constructor(fileFileResponse: FileFileResponse) {
    super(fileFileResponse)
    this.file = fileFileResponse.file
  }
}

export class FileExternal extends File {
  public readonly type = 'file'
  public readonly external: {
    url: string
  }

  constructor(fileExternalResponse: FileExternalResponse) {
    super(fileExternalResponse)
    this.external = fileExternalResponse.external
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
