// @see https://developers.notion.com/reference/property-object#email

export interface EmailDatabasePropertyResponse {
  id: string
  name: string
  type: 'email'
  email: Record<string, unknown>
}

export class EmailDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'email'
  public readonly email: Record<string, unknown>

  constructor(emailDatabasePropertyResponse: EmailDatabasePropertyResponse) {
    this.id = emailDatabasePropertyResponse.id
    this.name = emailDatabasePropertyResponse.name
    this.type = emailDatabasePropertyResponse.type
    this.email = emailDatabasePropertyResponse.email
  }
}
