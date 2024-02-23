// @see https://developers.notion.com/reference/property-object#phone-number

export interface PhoneNumberDatabasePropertyResponse {
  id: string
  name: string
  type: 'phone_number'
  phone_number: Record<string, unknown>
}

export class PhoneNumberDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'phone_number'
  public readonly phone_number: Record<string, unknown>

  constructor(
    phoneNumberDatabasePropertyResponse: PhoneNumberDatabasePropertyResponse
  ) {
    this.id = phoneNumberDatabasePropertyResponse.id
    this.name = phoneNumberDatabasePropertyResponse.name
    this.type = phoneNumberDatabasePropertyResponse.type
    this.phone_number = phoneNumberDatabasePropertyResponse.phone_number
  }
}
