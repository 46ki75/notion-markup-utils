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
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
  type?: 'person' | 'bot'

  /**
   * User's name, as displayed in Notion.
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
  name?: string

  /**
   * Chosen avatar image.
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
  avatar_url?: string
}

export interface UserResponseSimplified {
  name?: string
  avatar_url?: string
}

export class User {
  /**
   * Always "user"
   */
  public readonly object = 'user'

  /**
   * Unique identifier for this user.
   */
  public readonly id: string

  /**
   * Type of the user. Possible values are "person" and "bot".
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
  public readonly type?: 'person' | 'bot'

  /**
   * User's name, as displayed in Notion.
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
  public readonly name?: string

  /**
   * Chosen avatar image.
   *
   * @note When creating an API key for Notion,
   * it is necessary to explicitly check the setting to read user information, otherwise it cannot be obtained.
   *
   * @see https://www.notion.so/help/create-integrations-with-the-notion-api
   */
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

  simplify(): UserResponseSimplified {
    return {
      name: this.name,
      avatar_url: this.avatar_url
    }
  }
}
