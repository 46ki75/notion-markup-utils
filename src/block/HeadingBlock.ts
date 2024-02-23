// @see https://developers.notion.com/reference/block#headings
import { type BlockClient } from '../client/BlockClient'
import { type Color } from '../other'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

// Heading 1
export interface Heading1BlockResponse extends BlockResponse {
  type: 'heading_1'
  heading_1: {
    rich_text: RichTextResponse[]
    color: Color
    is_toggleable: boolean
  }
}

export class Heading1Block extends Block {
  public readonly type: 'heading_1'
  public readonly heading_1: {
    rich_text: RichText[]
    color: Color
    is_toggleable: boolean
  }

  constructor(
    heading1BlockResponse: Heading1BlockResponse,
    notion: BlockClient
  ) {
    super(heading1BlockResponse, notion)
    this.type = heading1BlockResponse.type
    this.heading_1 = {
      ...heading1BlockResponse.heading_1,
      rich_text: heading1BlockResponse.heading_1.rich_text?.map(
        (item) => new RichText(item) ?? []
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.heading_1.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<h1 class='notion-heading-1'>${HTML.join('')}</h1>`
  }
}

// Heading 2
export interface Heading2BlockResponse extends BlockResponse {
  type: 'heading_2'
  heading_2: {
    rich_text: RichTextResponse[]
    color: Color
    is_toggleable: boolean
  }
}

export class Heading2Block extends Block {
  public readonly type: 'heading_2'
  public readonly heading_2: {
    rich_text: RichText[]
    color: Color
    is_toggleable: boolean
  }

  constructor(
    heading2BlockResponse: Heading2BlockResponse,
    notion: BlockClient
  ) {
    super(heading2BlockResponse, notion)
    this.type = heading2BlockResponse.type
    this.heading_2 = {
      ...heading2BlockResponse.heading_2,
      rich_text: heading2BlockResponse.heading_2.rich_text?.map(
        (item) => new RichText(item) ?? []
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.heading_2.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<h2 class='notion-heading-2'>${HTML.join('')}</h2>`
  }
}

// Heading 3
export interface Heading3BlockResponse extends BlockResponse {
  type: 'heading_3'
  heading_3: {
    rich_text: RichTextResponse[]
    color: Color
    is_toggleable: boolean
  }
}

export class Heading3Block extends Block {
  public readonly type: 'heading_3'
  public readonly heading_3: {
    rich_text: RichText[]
    color: Color
    is_toggleable: boolean
  }

  constructor(
    heading3BlockResponse: Heading3BlockResponse,
    notion: BlockClient
  ) {
    super(heading3BlockResponse, notion)
    this.type = heading3BlockResponse.type
    this.heading_3 = {
      ...heading3BlockResponse.heading_3,
      rich_text: heading3BlockResponse.heading_3.rich_text?.map(
        (item) => new RichText(item) ?? []
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.heading_3.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<h3 class='notion-heading-3'>${HTML.join('')}</h3>`
  }
}
