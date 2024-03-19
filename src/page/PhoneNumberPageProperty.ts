// @see https://developers.notion.com/reference/page-property-values#phone-number

import { type DeepPartial } from '../utils'

/**
 * The documentation on Notion includes an example response with a 'name' entry,
 * but it has been confirmed that this is not being sent as of the current moment.
 * @see https://developers.notion.com/reference/page-property-values#phone-number
 */
export interface PhoneNumberPagePropertyResponse {
  id: string
  type: 'phone_number'
  phone_number: string
}

export type PhoneNumberPagePropertyResponseSimplified = string

/**
 * The documentation on Notion includes an example response with a 'name' entry,
 * but it has been confirmed that this is not being sent as of the current moment.
 * @see https://developers.notion.com/reference/page-property-values#phone-number
 */
export class PhoneNumberPageProperty {
  public readonly id: string
  public readonly type = 'phone_number'
  public readonly phone_number: string

  constructor(
    phoneNumberPagePropertyResponse: PhoneNumberPagePropertyResponse
  ) {
    this.id = phoneNumberPagePropertyResponse.id
    this.phone_number = phoneNumberPagePropertyResponse.phone_number
  }

  toJSON(): PhoneNumberPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      phone_number: this.phone_number
    }
  }

  simplify(): PhoneNumberPagePropertyResponseSimplified {
    return this.phone_number
  }
}

export const phone = (
  phoneNumber: string
): DeepPartial<PhoneNumberPagePropertyResponse> => {
  return {
    type: 'phone_number',
    phone_number: phoneNumber
  }
}
