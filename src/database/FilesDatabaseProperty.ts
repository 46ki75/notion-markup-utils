// @see https://developers.notion.com/reference/property-object#files

export interface FilesDatabasePropertyResponse {
  id: string
  name: string
  type: 'files'
  files: Record<string, unknown>
}

export class FilesDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'files'
  public readonly files: Record<string, unknown>

  constructor(filesDatabasePropertyResponse: FilesDatabasePropertyResponse) {
    this.id = filesDatabasePropertyResponse.id
    this.name = filesDatabasePropertyResponse.name
    this.type = filesDatabasePropertyResponse.type
    this.files = filesDatabasePropertyResponse.files
  }
}
