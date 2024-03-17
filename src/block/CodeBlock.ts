// @see https://developers.notion.com/reference/block#code
import { type BlockClient } from '../client/BlockClient'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface CodeBlockResponse extends BlockResponse {
  type: 'code'
  code: {
    caption: RichTextResponse[]
    rich_text: RichTextResponse[]
    language: Language
  }
}

export class CodeBlock extends Block {
  public readonly type = 'code'
  public readonly code: {
    caption: RichText[]
    rich_text: RichText[]
    language: Language
  }

  constructor(codeBlockResponse: CodeBlockResponse, notion: BlockClient) {
    super(codeBlockResponse, notion)
    this.code = {
      caption: codeBlockResponse.code.caption.map(
        (item) => new RichText(item) ?? []
      ),
      rich_text: codeBlockResponse.code.rich_text?.map(
        (item) => new RichText(item) ?? []
      ),
      language: codeBlockResponse.code.language
    }
  }

  async toHTML(): Promise<string> {
    const code = this.code.rich_text.map((item) => item.toPlainText()).join('')
    const caption = this.code.caption.map((item) => item.toPlainText()).join('')
    const notionCodeLanguage =
      caption.trim() === '' ? this.code.language : caption.trim()
    const headerBlock = `<div class='notion-code-header'><div class='notion-code-language'>${notionCodeLanguage}</div><div class='notion-code-copy'>Copy Code</div></div>`
    const codeBlock = `<pre class='${this.code.language}'><code class='language-${this.code.language}'>${code}</code></pre>`
    return `<div class='notion-code'>${headerBlock}${codeBlock}</div>`
  }
}

export interface CodeBlockRequest {
  type: 'code'
  code: {
    caption: RichTextResponse[]
    rich_text: RichTextResponse[]
    language: Language
  }
}

export class CodeBlockRequestBuilder {
  private readonly type = 'code'
  private readonly code: {
    caption: RichText[]
    rich_text: RichText[]
    language: Language
  }

  constructor(richText: RichTextResponse[] | RichTextResponse) {
    this.code = {
      rich_text: Array.isArray(richText)
        ? richText.map((text) => new RichText(text))
        : [new RichText(richText)],
      language: 'plain text',
      caption: []
    }
  }

  public language(language: Language): this {
    this.code.language = language
    return this
  }

  public build(): CodeBlockRequest {
    return {
      type: this.type,
      code: {
        rich_text: this.code.rich_text.map((text) => text.toJSON()),
        language: this.code.language,
        caption: this.code.caption.map((text) => text.toJSON())
      }
    }
  }
}

export type Language =
  | 'abap'
  | 'arduino'
  | 'bash'
  | 'basic'
  | 'c'
  | 'clojure'
  | 'coffeescript'
  | 'c++'
  | 'c#'
  | 'css'
  | 'dart'
  | 'diff'
  | 'docker'
  | 'elixir'
  | 'elm'
  | 'erlang'
  | 'flow'
  | 'fortran'
  | 'f#'
  | 'gherkin'
  | 'glsl'
  | 'go'
  | 'graphql'
  | 'groovy'
  | 'haskell'
  | 'html'
  | 'java'
  | 'javascript'
  | 'json'
  | 'julia'
  | 'kotlin'
  | 'latex'
  | 'less'
  | 'lisp'
  | 'livescript'
  | 'lua'
  | 'makefile'
  | 'markdown'
  | 'markup'
  | 'matlab'
  | 'mermaid'
  | 'nix'
  | 'objective-c'
  | 'ocaml'
  | 'pascal'
  | 'perl'
  | 'php'
  | 'plain text'
  | 'powershell'
  | 'prolog'
  | 'protobuf'
  | 'python'
  | 'r'
  | 'reason'
  | 'ruby'
  | 'rust'
  | 'sass'
  | 'scala'
  | 'scheme'
  | 'scss'
  | 'shell'
  | 'sql'
  | 'swift'
  | 'typescript'
  | 'vb.net'
  | 'verilog'
  | 'vhdl'
  | 'visual basic'
  | 'webassembly'
  | 'xml'
  | 'yaml'
  | 'java/c/c++/c#'
