// @see https://developers.notion.com/reference/page-property-values#phone-number

export interface PhoneNumberPagePropertyResponse {
  id: string
  name: string
  type: 'phone_number'
  phone_number: string
}

export type PhoneNumberPagePropertyResponseSimplified = string

export class PhoneNumberPageProperty {
  public readonly id: string
  public readonly name: string
  public readonly type = 'phone_number'
  public readonly phone_number: string

  constructor(
    phoneNumberPagePropertyResponse: PhoneNumberPagePropertyResponse
  ) {
    this.id = phoneNumberPagePropertyResponse.id
    this.name = phoneNumberPagePropertyResponse.name
    this.phone_number = phoneNumberPagePropertyResponse.phone_number
  }

  toJSON(): PhoneNumberPagePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      phone_number: this.phone_number
    }
  }

  simplify(): PhoneNumberPagePropertyResponseSimplified {
    return this.phone_number
  }
}
