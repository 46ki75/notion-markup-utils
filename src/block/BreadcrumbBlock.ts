// @see https://developers.notion.com/reference/block#breadcrumb
import { type DeepPartial } from '../utils'
import { Block, type BlockResponse } from './Block'

export interface BreadcrumbBlockResponse extends BlockResponse {
  type: 'breadcrumb'
  breadcrumb: Record<string, unknown>
}

export class BreadcrumbBlock extends Block {
  public readonly type = 'breadcrumb'
  public readonly breadcrumb = {}
}

/**
 * I will create a breadcrumb function. This function takes no arguments.
 *
 * ```ts
 * const data = await notion.blocks.append({
 *   id: 'XXXXXXXXXX',
 *   children: [b.breadcrumb()]
 * })
 * ```
 * @returns {DeepPartial<BreadcrumbBlockResponse>} Objects that can be used to update a Notion Block
 */
export const breadcrumb = (): DeepPartial<BreadcrumbBlockResponse> => ({
  type: 'breadcrumb',
  breadcrumb: {}
})
