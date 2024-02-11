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
