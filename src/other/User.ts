/**
 * @see https://developers.notion.com/reference/user
 *
 * Represents a user in a Notion workspace. This can be a full workspace member, guest, or integration (bot).
 */
export interface UserResponse {
  /**
   * Always "user"
   */
  object: 'user'

  /**
   * Unique identifier for this user.
   */
  id: string

  /**
   * Type of the user. Possible values are "person" and "bot".
   */
  type?: 'person' | 'bot'

  /**
   * User's name, as displayed in Notion.
   */
  name?: string

  /**
   * Chosen avatar image.
   */
  avatar_url?: string
}

export class User {
  public readonly object = 'user'
  public readonly id: string
  public readonly type?: 'person' | 'bot'
  public readonly name?: string
  public readonly avatar_url?: string

  constructor(userResponse: UserResponse) {
    this.id = userResponse.id
    this.type = userResponse.type
    this.name = userResponse.name
    this.avatar_url = userResponse.avatar_url
  }

  toJSON(): UserResponse {
    return {
      object: this.object,
      id: this.id,
      type: this.type,
      name: this.name,
      avatar_url: this.avatar_url
    }
  }
}
