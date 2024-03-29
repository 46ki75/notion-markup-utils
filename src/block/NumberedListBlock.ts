// @see https://developers.notion.com/reference/block#numbered-list-item
import { type BlockClient } from '../client/BlockClient'
import { type Color } from '../other'
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'
import {
  RichText,
  type RichTextRequestBuilder,
  r,
  type RichTextResponse
} from './RichText'

export interface NumberedListBlockResponse extends BlockResponse {
  type: 'numbered_list_item'
  numbered_list_item: {
    rich_text: RichTextResponse[]
    color: Color
    children: BlockResponse[]
  }
}

export class NumberedListBlock extends Block {
  public readonly type = 'numbered_list_item'
  public readonly numbered_list_item: {
    rich_text: RichText[]
    color: string
    children: Block[]
  }

  constructor(
    numberedListBlockResponse: NumberedListBlockResponse,
    notion: BlockClient
  ) {
    super(numberedListBlockResponse, notion)
    this.numbered_list_item = {
      rich_text: numberedListBlockResponse.numbered_list_item.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      color: numberedListBlockResponse.numbered_list_item.color,
      children: numberedListBlockResponse.numbered_list_item.children?.map(
        (block) => new Block(block, notion)
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.numbered_list_item.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<li class='notion-numbered-list-item'>${HTML.join('')}</li>`
  }
}

export interface NumberedListItemBlockRequest {
  type: 'numbered_list_item'
  numbered_list_item: {
    rich_text: RichTextResponse[]
    color: Color
    children: BlockResponse[]
  }
}

export class NumberedListItemBlockRequestBuilder {
  private readonly type = 'numbered_list_item'
  private readonly numbered_list_item: {
    rich_text: RichText[]
    color: Color
    children: Block[]
  }

  constructor(richText: RichTextResponse[] | RichTextResponse) {
    this.numbered_list_item = {
      rich_text: Array.isArray(richText)
        ? richText.map((text) => new RichText(text))
        : [new RichText(richText)],
      color: 'default',
      children: []
    }
  }

  public color(color: Color): this {
    this.numbered_list_item.color = color
    return this
  }

  public build(): NumberedListItemBlockRequest {
    return {
      type: this.type,
      numbered_list_item: {
        rich_text: this.numbered_list_item.rich_text.map((text) =>
          text.toJSON()
        ),
        color: this.numbered_list_item.color,
        children: this.numbered_list_item.children.map((block) =>
          block.toJSON()
        )
      }
    }
  }
}

/**
 *
 * ### Basic Usage:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.ol('Hi')]
 * })
 * ```
 *
 * ### With RichText:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.ol(r('Hi').bold())]
 * })
 * ```
 *
 * ### With RichText Array:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.ol(r('Hello')), b.ol(r('world!'))]
 * })
 * ```
 *
 *
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} text Strings to use in a list.
 * @returns {DeepPartial<BulletedListItemBlockResponse>} Objects that can be used to create a Notion Block
 */
export const ol = (
  text: string | RichTextRequestBuilder[] | RichTextRequestBuilder
): DeepPartial<NumberedListBlockResponse> => {
  return {
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text:
        text != null
          ? Array.isArray(text)
            ? text.map((t) => t.build())
            : typeof text === 'string'
              ? [r(text).build()]
              : [text.build()]
          : [],
      children: []
    }
  }
}
