// @see https://developers.notion.com/reference/property-object#rollup

import { type FunctionType } from '../other/FunctionType'

export interface RollupDatabasePropertyResponse {
  id: string
  name: string
  type: 'rollup'
  rollup: {
    rollup_property_name: string
    relation_property_name: string
    rollup_property_id: string
    relation_property_id: string
    function: FunctionType
  }
}

export class RollupDatabaseProperty {
  public readonly id: string
  public readonly name: string
  public readonly type: 'rollup'
  public readonly rollup: {
    rollup_property_name: string
    relation_property_name: string
    rollup_property_id: string
    relation_property_id: string
    function: FunctionType
  }

  constructor(rollupDatabasePropertyResponse: RollupDatabasePropertyResponse) {
    this.id = rollupDatabasePropertyResponse.id
    this.name = rollupDatabasePropertyResponse.name
    this.type = rollupDatabasePropertyResponse.type
    this.rollup = rollupDatabasePropertyResponse.rollup
  }

  toJSON(): RollupDatabasePropertyResponse {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      rollup: this.rollup
    }
  }
}
