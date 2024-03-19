export type QuerySort = PropertyValueSort | EntryTimestampSort

export interface PropertyValueSort {
  /**
   * The name of the property to s against.
   */
  property: string

  /**
   * The direction to s. Possible values include "ascending" and "descending".
   */
  direction: 'ascending' | 'descending'
}

export interface EntryTimestampSort {
  /**
   * The name of the timestamp to s against. Possible values include "created_time" and "last_edited_time".
   */
  timestamp: 'created_time' | 'last_edited_time'

  /**
   * The direction to s. Possible values include "ascending" and "descending".
   */
  direction: 'ascending' | 'descending'
}

export const s = {
  ascending: (propertyName: string): PropertyValueSort => {
    return {
      property: propertyName,
      direction: 'ascending'
    }
  },
  descending: (propertyName: string): PropertyValueSort => {
    return {
      property: propertyName,
      direction: 'descending'
    }
  },
  createdTimeAscending: (): EntryTimestampSort => ({
    timestamp: 'created_time',
    direction: 'ascending'
  }),
  createdTimeDescending: (): EntryTimestampSort => ({
    timestamp: 'created_time',
    direction: 'descending'
  }),
  lastEditedTimeAscending: (): EntryTimestampSort => ({
    timestamp: 'last_edited_time',
    direction: 'ascending'
  }),
  lastEditedTimeDescending: (): EntryTimestampSort => ({
    timestamp: 'last_edited_time',
    direction: 'descending'
  })
}
