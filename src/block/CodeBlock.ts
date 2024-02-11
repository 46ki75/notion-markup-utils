// @see https://developers.notion.com/reference/block#code
import { Block, type BlockResponse } from './Block'
import { RichText, type RichTextResponse } from './RichText'

export interface CodeBlockResponse extends BlockResponse {
  type: 'code'
  code: {
    caption: []
    rich_text: RichTextResponse[]
  }
  language: Language
}

export class CodeBlock extends Block {
  public readonly type = 'code'
  public readonly code: {
    caption: RichText[]
    rich_text: RichText[]
  }

  public readonly language: Language

  constructor(codeBlockResponse: CodeBlockResponse) {
    super(codeBlockResponse)
    this.code = {
      caption: codeBlockResponse.code.caption.map((item) => new RichText(item)),
      rich_text: codeBlockResponse.code.rich_text.map(
        (item) => new RichText(item)
      )
    }
    this.language = codeBlockResponse.language
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
