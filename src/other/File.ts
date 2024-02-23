// @see https://developers.notion.com/reference/file-object

import { RichText, type RichTextResponse } from '../block'

export type FileResponse = FileFileResponse | FileExternalResponse

export type FileResponseSimplified = string

export class File {
  public readonly type: 'file' | 'external'
  public readonly caption: RichText[]
  public readonly file?: {
    url: string
    expiry_time?: string
  }

  public readonly external?: {
    url: string
  }

  constructor(fileResponse: FileResponse) {
    this.type = fileResponse.type
    this.caption = fileResponse.caption.map((text) => new RichText(text))
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

  toJSON(): FileResponse {
    if (this.type === 'file' && this.file != null) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { url, expiry_time } = this.file
      if (expiry_time !== undefined) {
        return {
          type: this.type,
          caption: this.caption.map((text) => text.toJSON()),
          file: { url, expiry_time }
        }
      } else {
        throw new Error('File expiry_time is missing')
      }
    } else if (this.type === 'external' && this.external != null) {
      return {
        type: this.type,
        caption: this.caption.map((text) => text.toJSON()),
        external: this.external
      }
    }
    throw new Error('Invalid or incomplete file data')
  }

  simplify(): FileResponseSimplified {
    if (this.type === 'file' && this.file != null) return this.file?.url
    if (this.type === 'external' && this.external != null)
      return this.external?.url
    return ''
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
