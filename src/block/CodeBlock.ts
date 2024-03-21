// @see https://developers.notion.com/reference/block#code
import { type BlockClient } from '../client/BlockClient'
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'
import {
  RichText,
  r,
  type RichTextRequestBuilder,
  type RichTextResponse
} from './RichText'

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

/**
 * Create a code block. The first argument is the code text,
 * the second argument is the language, and the third argument is the caption.
 *
 * ### Usage:
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.codeblock('console.log(data)', 'typescript')]
 * })
 * ```
 *
 * ### With Caption
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.codeblock('console.log(data)', 'typescript', 'src/index.ts')]
 * })
 * ```
 *
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} code Text of source code.
 * @param {Language} language Programing Language (default -> 'plain_text')
 * @param {string | RichTextRequestBuilder[] | RichTextRequestBuilder} caption Caption
 * @returns
 */
export const codeblock = (
  code: string | RichTextRequestBuilder[] | RichTextRequestBuilder,
  language?: Language,
  caption?: string | RichTextRequestBuilder[] | RichTextRequestBuilder
): DeepPartial<CodeBlockResponse> => ({
  type: 'code',
  code: {
    caption:
      caption != null
        ? Array.isArray(caption)
          ? caption.map((t) => t.build())
          : typeof caption === 'string'
            ? [r(caption).build()]
            : [caption.build()]
        : [],
    rich_text:
      code != null
        ? Array.isArray(code)
          ? code.map((t) => t.build())
          : typeof code === 'string'
            ? [r(code).build()]
            : [code.build()]
        : [],
    language: language ?? 'plain text'
  }
})
