// @see  https://developers.notion.com/reference/block#to-do
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface ToDoBlockResponse extends BlockResponse {
  type: 'to_do'
  to_do: {
    rich_text: RichTextResponse[]
    checked: boolean
    color: string
    children: BlockResponse[]
  }
}

export class ToDoBlock extends Block {
  public readonly type = 'to_do'
  public readonly to_do: {
    rich_text: RichText[]
    checked: boolean
    color: string
    children: Block[]
  }

  constructor(toDoBlockResponse: ToDoBlockResponse, notion: BlockClient) {
    super(toDoBlockResponse, notion)
    this.to_do = {
      ...toDoBlockResponse.to_do,
      rich_text: toDoBlockResponse.to_do.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      children: toDoBlockResponse.to_do.children?.map(
        (child) => new Block(child, notion)
      )
    }
  }

  async toHTML(): Promise<string> {
    const HTMLPromise = this.to_do.rich_text?.map(
      async (item) => await item.toHTML()
    )
    const HTML = await Promise.all(HTMLPromise)
    return `<li class='notion-todo'>${HTML.join('')}</li>`
  }
}
