// @see https://developers.notion.com/reference/page-property-values#status

import { type ColorFG } from '../other'

export interface StatusPagePropertyResponse<T extends string = string> {
  id: string
  type: 'status'
  status: {
    id: string
    name: T
    color: ColorFG
  }
}

export interface StatusPagePropertyResponseSimplified<
  T extends string = string
> {
  name: T
  color: ColorFG
}

/**
 * When a column named "Status" can have the states of
 * `Not started`, `In Progress`, or `Done`, you can use type generics as shown below.
 *
 * ```ts
 * StatusPageProperty<'Not started' | 'In Progress' | 'Done'>
 * ```
 *
 * ---
 *
 * **Examples of type annotations used in database queries:**
 * ```ts
 * const notion = new NotionClient()
 * const { results } = await notion.databases.query<{
 *   title: TitlePageProperty
 *   status: StatusPageProperty<'Not started' | 'In Progress' | 'Done'>
 * }>({
 *   id: 'XXXXXXXXXXXXXXXX',
 *   filter: { and: [f.status('Status').equals('In Progress')] }
 * })
 * ```
 */
export class StatusPageProperty<T extends string = string> {
  public readonly id: string
  public readonly type = 'status'
  public readonly status: {
    id: string
    name: T
    color: ColorFG
  }

  constructor(statusPageProperty: StatusPagePropertyResponse<T>) {
    this.id = statusPageProperty.id
    this.status = statusPageProperty.status
  }

  toJSON(): StatusPagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      status: this.status
    }
  }

  simplify(): StatusPagePropertyResponseSimplified<T> {
    return { name: this.status.name, color: this.status.color }
  }
}
