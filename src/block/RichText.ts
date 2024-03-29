import { type Color } from '../other'

export type RichTextResponse =
  | RichTextTextResponse
  | RichTextEquationResponse
  | RichTextMentionResponse

export class RichText {
  public type: 'text' | 'mention' | 'equation'
  public readonly annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: Color
  }

  public readonly plain_text: string
  public readonly href: null | string

  public readonly text?: {
    content: string
    link: null | string
  }

  public readonly equation?: {
    expression: string
  }

  public readonly mention?: RichTextMentionResponseMention

  constructor(richTextResponse: RichTextResponse) {
    this.type = richTextResponse.type
    this.annotations = richTextResponse.annotations
    this.plain_text = richTextResponse.plain_text
    this.href = richTextResponse.href

    if (richTextResponse.type === 'text' && 'text' in richTextResponse) {
      this.text = richTextResponse.text
    } else if (
      richTextResponse.type === 'equation' &&
      'equation' in richTextResponse
    ) {
      this.equation = richTextResponse.equation
    } else if (
      richTextResponse.type === 'mention' &&
      'mention' in richTextResponse
    ) {
      this.mention = richTextResponse.mention
    }
  }

  toDOMJSON(): RichTextDOMJSON {
    return {
      text: this.plain_text,
      bold: this.annotations.bold,
      italic: this.annotations.italic,
      strikethrough: this.annotations.strikethrough,
      underline: this.annotations.underline,
      code: this.annotations.code,
      color: this.annotations.color,
      link: this.href ?? this.text?.link ?? null
    }
  }

  toJSON(): RichTextResponse {
    const baseResponse: RichTextResponseBase = {
      annotations: this.annotations,
      plain_text: this.plain_text,
      href: this.href
    }

    if (this.type === 'text' && this.text != null) {
      return {
        ...baseResponse,
        type: 'text',
        text: this.text
      }
    }

    if (this.type === 'equation' && this.equation != null) {
      return {
        ...baseResponse,
        type: 'equation',
        equation: this.equation
      }
    }

    if (this.type === 'mention' && this.mention != null) {
      return {
        ...baseResponse,
        type: 'mention',
        mention: this.mention
      }
    }

    return baseResponse as RichTextResponse
  }

  async toHTML(): Promise<string> {
    let HTML = this.plain_text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

    if (this.annotations.code) {
      HTML = `<code>${HTML}</code>`
    }
    if (this.annotations.bold) {
      HTML = `<strong>${HTML}</strong>`
    }
    if (this.annotations.italic) {
      HTML = `<em>${HTML}</em>`
    }
    if (this.annotations.underline) {
      HTML = `<ins>${HTML}</ins>`
    }
    if (this.annotations.strikethrough) {
      HTML = `<del>${HTML}</del>`
    }

    return `<span class='notion-rich-text ${this.annotations.color}'>${HTML}</span>`
  }

  toPlainText(): string {
    return this.plain_text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
}

export class RichTextText extends RichText {
  public readonly text: {
    content: string
    link: null | string
  }

  constructor(response: RichTextTextResponse) {
    super(response)
    this.type = 'text'
    this.text = response.text
  }
}

export class RichTextEquation extends RichText {
  public readonly equation: {
    expression: string
  }

  constructor(response: RichTextEquationResponse) {
    super(response)
    this.type = 'equation'
    this.equation = response.equation
  }
}

export class RichTextMention extends RichText {
  public readonly mention: RichTextMentionResponseMention

  constructor(response: RichTextMentionResponse) {
    super(response)
    this.type = 'mention'
    this.mention = response.mention
  }
}

export interface RichTextResponseBase {
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: Color
  }
  plain_text: string
  href: null | string
}

export interface RichTextTextResponse extends RichTextResponseBase {
  type: 'text'
  text: {
    content: string
    link: null | string
  }
}

export interface RichTextEquationResponse extends RichTextResponseBase {
  type: 'equation'
  equation: {
    expression: string
  }
}

export interface RichTextMentionResponse extends RichTextResponseBase {
  type: 'mention'
  mention: RichTextMentionResponseMention
}

export interface RichTextMentionResponseMention {
  type: 'database'
  database:
    | {
        id: string
      }
    | {
        type: 'date'
        date: {
          start: string
          end: null | string
        }
      }
    | {
        type: 'link_preview'
        link_preview: {
          url: string
        }
      }
    | {
        type: 'page'
        page: {
          id: string
        }
      }
    | {
        type: 'template_mention'
        template_mention: {
          type: 'template_mention_date'
          template_mention_date: string
        }
      }
    | {
        type: 'template_mention'
        template_mention: {
          type: string
          template_mention_user: 'me'
        }
      }
    | {
        type: 'user'
        user: {
          object: 'user'
          id: string
        }
      }
}

export interface RichTextRequest {
  type: 'text'
  text: { content: string; link: null }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: Color
  }
  plain_text: string
  href: string | null
}

export class RichTextRequestBuilder {
  private readonly type = 'text'
  private readonly text = { content: '', link: null }
  private readonly annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: Color
  } = {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default'
  }

  private readonly plain_text: string
  private href: string | null = null

  constructor(content: string) {
    this.text.content = content
    this.plain_text = content
  }

  public bold(): this {
    this.annotations.bold = true
    return this
  }

  public italic(): this {
    this.annotations.italic = true
    return this
  }

  public strikethrough(): this {
    this.annotations.strikethrough = true
    return this
  }

  public underline(): this {
    this.annotations.underline = true
    return this
  }

  public code(): this {
    this.annotations.code = true
    return this
  }

  public link(url: string): this {
    this.href = url
    return this
  }

  public color(color: Color): this {
    this.annotations.color = color
    return this
  }

  public build(): RichTextResponse {
    return {
      type: 'text',
      text: this.text,
      annotations: this.annotations,
      plain_text: this.plain_text,
      href: this.href
    }
  }
}

/**
 * @note RichText must be within **2000** characters in length. Additionally, emojis are counted as two characters.
 */
export const r = (text: string): RichTextRequestBuilder =>
  new RichTextRequestBuilder(text)

export interface RichTextDOMJSON {
  text: string
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: Color
  link: string | null
}
