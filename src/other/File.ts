// @see https://developers.notion.com/reference/file-object

import { RichText, type RichTextResponse } from '../block'

export type FileResponse =
  | FileFileResponse
  | FileExternalResponse
  | FileNullResponse

export type FileResponseSimplified = string

export class File {
  public readonly type: 'file' | 'external' | null
  public readonly caption: RichText[] | null
  public readonly file: {
    /**
     * When the type is `'file'`, a signed URL for AWS S3 is stored.
     * This becomes **inaccessible** after **1 hour**.
     *
     * Please refer to `expiry_time` for the accurate accessible hours.
     */
    url: string

    /**
     * The time when access to this URL will no longer be possible.
     * AWS S3 signed URLs are time-limited for security reasons.
     */
    expiry_time?: string
  } | null = null

  public readonly external: {
    url: string
  } | null = null

  constructor(fileResponse: FileResponse) {
    this.type = fileResponse.type
    this.caption =
      fileResponse?.caption?.map((text) => new RichText(text)) ?? null
    if (
      this.type === 'file' &&
      'file' in fileResponse &&
      fileResponse?.file != null
    ) {
      this.file = {
        url: fileResponse.file.url,
        expiry_time: fileResponse.file.expiry_time
      }
    } else if (
      this.type === 'external' &&
      'external' in fileResponse &&
      fileResponse.external != null
    ) {
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
          caption: this.caption?.map((text) => text.toJSON()) ?? null,
          file: { url, expiry_time }
        }
      } else {
        throw new Error('File expiry_time is missing')
      }
    } else if (this.type === 'external' && this.external != null) {
      return {
        type: this.type,
        caption: this.caption?.map((text) => text.toJSON()) ?? null,
        external: this.external
      }
    } else if (this.type == null) {
      return {
        type: null,
        caption: null,
        file: null,
        external: null
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
  type: 'file' | 'external' | null
  caption: RichTextResponse[] | null
}

export interface FileFileResponse extends FileBase {
  type: 'file'
  file: {
    url: string
    expiry_time: string
  } | null
}

export interface FileExternalResponse extends FileBase {
  type: 'external'
  external: {
    url: string
  } | null
}

export interface FileNullResponse extends FileBase {
  type: null
  caption: null
  file: null
  external: null
}
