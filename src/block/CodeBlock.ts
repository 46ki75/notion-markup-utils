// @see https://developers.notion.com/reference/block#code
import { type NotionClient } from '../Client'
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface CodeBlockResponse extends BlockResponse {
  type: 'code'
  code: {
    caption: []
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

  constructor(codeBlockResponse: CodeBlockResponse, notion: NotionClient) {
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
    const text = this.code.rich_text.map((item) => item.toPlainText()).join('')
    const headerBlock = `<div class='notion-code-header class='notion-code-language''><div>${this.code.language}</div><div class='notion-code-copy'></div></div>`
    const codeBlock = `<pre class='${this.code.language}'><code class='language-${this.code.language}'>${text}</code></pre>`
    const captionBlock = `<div class='notion-code-caption'>${this.code.caption.map((item) => item.toPlainText()).join('')}</div>`
    return `<div class='notion-code'>${headerBlock}${codeBlock}${captionBlock}</div>`
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
