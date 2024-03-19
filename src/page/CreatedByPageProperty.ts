// @see https://developers.notion.com/reference/page-property-values#created-by
import { User, type UserResponseSimplified, type UserResponse } from '../other'

/**
 * When creating an API key with Ntion,
 * it is configured not to read user information by default,
 * resulting in no user information being displayed.
 * Therefore, explicit permission is required if access to user information is needed.
 */
export interface CreatedByPagePropertyResponse {
  id: string
  type: 'created_by'

  /**
   * When creating an API key with Ntion,
   * it is configured not to read user information by default,
   * resulting in no user information being displayed.
   * Therefore, explicit permission is required if access to user information is needed.
   */
  created_by: UserResponse
}

/**
 * This contains only the fields for name and avatar URL.
 *
 * ### e.g.) 1
 * ```json
 * { name: 'default', avatar_url: null }
 * ```
 * ### e.g.) 2
 * ```json
 * {
 *   name: 'Jhon',
 *   avatar_url: 'https://example.com/XXXXXXX'
 * }
 * ```
 */
export type CreatedByPagePropertyResponseSimplified = UserResponseSimplified

export class CreatedByPageProperty {
  public readonly id: string
  public readonly type = 'created_by'

  /**
   * When creating an API key with Ntion,
   * it is configured not to read user information by default,
   * resulting in no user information being displayed.
   * Therefore, explicit permission is required if access to user information is needed.
   */
  public readonly created_by: User

  constructor(createdByPagePropertyResponse: CreatedByPagePropertyResponse) {
    this.id = createdByPagePropertyResponse.id
    this.created_by = new User(createdByPagePropertyResponse.created_by)
  }

  toJSON(): CreatedByPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      created_by: this.created_by.toJSON()
    }
  }

  /**
   * This method returns only the username and avatar URL.
   * @returns `{ name: string, avatar_url: string | null }`
   */
  simplify(): CreatedByPagePropertyResponseSimplified {
    return this.created_by.simplify()
  }
}
