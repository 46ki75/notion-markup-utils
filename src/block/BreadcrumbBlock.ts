// @see https://developers.notion.com/reference/block#breadcrumb
import { Block, type BlockResponse } from './Block'

export interface BreadcrumbBlockResponse extends BlockResponse {
  type: 'breadcrumb'
  breadcrumb: Record<string, unknown>
}

export class BreadcrumbBlock extends Block {
  public readonly type = 'breadcrumb'
  public readonly breadcrumb = {}
}
