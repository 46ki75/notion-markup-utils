// @see https://developers.notion.com/reference/page-property-values#phone-number

export interface PhoneNumberPagePropertyResponse {
  id: string
  name: string
  type: 'phone_number'
  phone_number: Record<string, unknown>
}

export class PhoneNumberPageProperty {
  private readonly id: string
  private readonly name: string
  private readonly type = 'phone_number'
  private readonly phone_number: Record<string, unknown>

  constructor(
    phoneNumberPagePropertyResponse: PhoneNumberPagePropertyResponse
  ) {
    this.id = phoneNumberPagePropertyResponse.id
    this.name = phoneNumberPagePropertyResponse.name
    this.phone_number = phoneNumberPagePropertyResponse.phone_number
  }
}
