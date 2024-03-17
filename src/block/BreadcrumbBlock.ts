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

export interface BreadcrumbBlockRequest {
  type: 'breadcrumb'
  breadcrumb: Record<string, unknown>
}

export class BreadcrumbBlockRequestBuilder {
  public readonly type = 'breadcrumb'
  public readonly breadcrumb = {}

  build(): BreadcrumbBlockRequest {
    return {
      type: this.type,
      breadcrumb: this.breadcrumb
    }
  }
}
