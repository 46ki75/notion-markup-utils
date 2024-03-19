// @see https://developers.notion.com/reference/page-property-values

/**
 * This is a new type of property, and there is no documentation on Notion yet.
 */
export interface ButtonPagePropertyResponse {
  id: string
  type: 'button'
  button: boolean
}

export type ButtonPagePropertyResponseSimplified = null

/**
 * This is a new type of property, and there is no documentation on Notion yet.
 */
export class ButtonPageProperty {
  public readonly id: string
  public readonly type = 'button'
  public readonly button: boolean

  constructor(buttonPagePropertyResponse: ButtonPagePropertyResponse) {
    this.id = buttonPagePropertyResponse.id
    this.button = buttonPagePropertyResponse.button
  }

  toJSON(): ButtonPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      button: this.button
    }
  }

  simplify(): ButtonPagePropertyResponseSimplified {
    return null
  }
}
