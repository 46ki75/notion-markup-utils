// @see https://developers.notion.com/reference/page-property-values#email

export interface EmailPagePropertyResponse {
  id: string
  type: 'email'

  /**
   * When a value is blank in Notion, it becomes null.
   */
  email: string | null
}

/**
 * When a value is blank in Notion, it becomes null.
 */
export type EmailPagePropertyResponseSimplified = string | null

export class EmailPageProperty {
  public readonly id: string
  public readonly type = 'email'

  /**
   * When a value is blank in Notion, it becomes null.
   */
  public readonly email: string | null

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

  /**
   * When a value is blank in Notion, it becomes null.
   */
  simplify(): EmailPagePropertyResponseSimplified {
    return this.email
  }
}
