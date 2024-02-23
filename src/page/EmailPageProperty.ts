// @see https://developers.notion.com/reference/page-property-values#email

export interface EmailPagePropertyResponse {
  id: string
  type: 'email'
  email: string
}

export type EmailPagePropertyResponseSimplified = string

export class EmailPageProperty {
  private readonly id: string
  private readonly type = 'email'
  private readonly email: string

  constructor(emailPagePropertyResponse: EmailPagePropertyResponse) {
    this.id = emailPagePropertyResponse.id
    this.email = emailPagePropertyResponse.email
  }

  toJSON(): EmailPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      email: this.email
    }
  }

  simplify(): EmailPagePropertyResponseSimplified {
    return this.email
  }
}
