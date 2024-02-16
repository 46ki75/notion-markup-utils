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

  constructor(richTextResponse: RichTextResponse) {
    this.type = richTextResponse.type
    this.annotations = richTextResponse.annotations
    this.plain_text = richTextResponse.plain_text
    this.href = richTextResponse.href
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
