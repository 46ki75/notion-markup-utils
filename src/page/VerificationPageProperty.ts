// @see https://developers.notion.com/reference/page-property-values#verification

import { User, type UserResponse } from '../other'

export interface VerificationPagePropertyResponse {
  id: string
  type: 'verification'
  verification: {
    state: 'verified' | 'unverified'
    verified_by: UserResponse | null
    date: {
      start: string
      end: string | null
      time_zone: string | null
    } | null
  }
}

export type VerificationPagePropertyResponseSimplified =
  | 'verified'
  | 'unverified'

export class VerificationPageProperty {
  private readonly id: string
  private readonly type = 'verification'
  private readonly verification: {
    state: 'verified' | 'unverified'
    verified_by: UserResponse | null
    date: {
      start: string
      end: string | null
      time_zone: string | null
    } | null
  }

  constructor(verificationPageProperty: VerificationPagePropertyResponse) {
    this.id = verificationPageProperty.id
    this.verification = {
      ...verificationPageProperty.verification,
      verified_by:
        verificationPageProperty?.verification?.verified_by != null
          ? new User(verificationPageProperty.verification.verified_by)
          : null
    }
  }

  toJSON(): VerificationPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      verification: this.verification
    }
  }

  simplify(): VerificationPagePropertyResponseSimplified {
    return this.verification.state
  }
}
