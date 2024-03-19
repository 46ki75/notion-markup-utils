export type QueryFilter =
  | CheckboxFilter
  | DateFilter
  | FilesFilter
  | FormulaFilter
  | MultiSelectFilter
  | NumberFilter
  | PeopleFilter
  | RelationFilter
  | RichTextFilter
  | SelectFilter
  | StatusFilter
  | TimestampFilter
  | IDFilter
  | RollupFilter
  | { and: QueryFilter[] }
  | { or: QueryFilter[] }

export interface CheckboxFilter {
  property: string
  checkbox: {
    equals?: boolean
    does_not_equal?: boolean
  }
}

export interface DateFilter {
  property: string
  date: {
    after?: string
    before?: string
    equals?: string
    is_empty?: true
    is_not_empty?: true
    next_month?: Record<string, unknown>
    next_week?: Record<string, unknown>
    next_year?: Record<string, unknown>
    on_or_after?: string
    on_or_before?: string
    past_month?: Record<string, unknown>
    past_week?: Record<string, unknown>
    past_year?: Record<string, unknown>
    this_week?: Record<string, unknown>
  }
}

export interface FilesFilter {
  property: string
  files: {
    is_empty?: true
    is_not_empty?: true
  }
}

export interface FormulaFilter {
  property: string
  formula:
    | Pick<CheckboxFilter, 'checkbox'>
    | Pick<DateFilter, 'date'>
    | Pick<NumberFilter, 'number'>
    | Pick<RichTextFilter, 'rich_text'>
}

export interface MultiSelectFilter {
  property: string
  multi_select: {
    contains?: string
    does_not_contain?: string
    is_empty?: true
    is_not_empty?: true
  }
}

export interface NumberFilter {
  property: string
  number: {
    does_not_equal?: number
    equals?: number
    greater_than?: number
    greater_than_or_equal_to?: number
    is_empty?: true
    is_not_empty?: true
    less_than?: number
    less_than_or_equal_to?: number
  }
}

export interface PeopleFilter {
  property: string
  people: {
    contains?: string
    does_not_contain?: string
    is_empty?: true
    is_not_empty?: true
  }
}

export interface RelationFilter {
  property: string
  relation: {
    contains?: string
    does_not_contain?: string
    is_empty?: true
    is_not_empty?: true
  }
}

export interface RichTextFilter {
  property: string
  rich_text: {
    contains?: string
    does_not_contain?: string
    does_not_equal?: string
    ends_with?: string
    equals?: string
    is_empty?: true
    is_not_empty?: true
    starts_with?: string
  }
}

export interface SelectFilter {
  property: string
  select: {
    contains?: string
    does_not_contain?: string
    is_empty?: true
    is_not_empty?: true
  }
}

export interface StatusFilter {
  property: string
  status: {
    equals?: string
    does_not_equal?: string
    is_empty?: true
    is_not_empty?: true
  }
}

export interface TimestampFilter {
  timestamp: 'created_time' | 'last_edited_time'
  created_time?: Pick<DateFilter, 'date'>['date']
  last_edited_time?: Pick<DateFilter, 'date'>['date']
}

export interface IDFilter {
  property: string
  unique_id: {
    equals?: number
    does_not_equal?: number
    greater_than?: number
    greater_than_or_equal_to?: number
    less_than?: number
    less_than_or_equal_to?: number
  }
}

export interface RollupFilter {
  property: string
  rollup: {
    any?:
      | Pick<CheckboxFilter, 'checkbox'>
      | Pick<DateFilter, 'date'>
      | Pick<FilesFilter, 'files'>
      | Pick<FormulaFilter, 'formula'>
      | Pick<MultiSelectFilter, 'multi_select'>
      | Pick<NumberFilter, 'number'>
      | Pick<PeopleFilter, 'people'>
      | Pick<RelationFilter, 'relation'>
      | Pick<RichTextFilter, 'rich_text'>
      | Pick<SelectFilter, 'select'>
      | Pick<StatusFilter, 'status'>
      | Pick<TimestampFilter, 'created_time'>
      | Pick<TimestampFilter, 'last_edited_time'>
      | Pick<IDFilter, 'unique_id'>
    every?:
      | Pick<CheckboxFilter, 'checkbox'>
      | Pick<DateFilter, 'date'>
      | Pick<FilesFilter, 'files'>
      | Pick<FormulaFilter, 'formula'>
      | Pick<MultiSelectFilter, 'multi_select'>
      | Pick<NumberFilter, 'number'>
      | Pick<PeopleFilter, 'people'>
      | Pick<RelationFilter, 'relation'>
      | Pick<RichTextFilter, 'rich_text'>
      | Pick<SelectFilter, 'select'>
      | Pick<StatusFilter, 'status'>
      | Pick<TimestampFilter, 'created_time'>
      | Pick<TimestampFilter, 'last_edited_time'>
      | Pick<IDFilter, 'unique_id'>
    none?:
      | Pick<CheckboxFilter, 'checkbox'>
      | Pick<DateFilter, 'date'>
      | Pick<FilesFilter, 'files'>
      | Pick<FormulaFilter, 'formula'>
      | Pick<MultiSelectFilter, 'multi_select'>
      | Pick<NumberFilter, 'number'>
      | Pick<PeopleFilter, 'people'>
      | Pick<RelationFilter, 'relation'>
      | Pick<RichTextFilter, 'rich_text'>
      | Pick<SelectFilter, 'select'>
      | Pick<StatusFilter, 'status'>
      | Pick<TimestampFilter, 'created_time'>
      | Pick<TimestampFilter, 'last_edited_time'>
      | Pick<IDFilter, 'unique_id'>
  }
}

export const f = {
  checkbox: (propertyName: string) => {
    return {
      equals: (flag: boolean) => {
        return {
          property: propertyName,
          checkbox: {
            equals: flag
          }
        }
      },
      does_not_equal: (flag: boolean) => {
        return {
          property: propertyName,
          checkbox: {
            does_not_equal: flag
          }
        }
      }
    }
  },
  date: (propertyName: string) => {
    return {
      after: (date: string) => {
        return {
          property: propertyName,
          date: {
            after: date
          }
        }
      },
      before: (date: string) => {
        return {
          property: propertyName,
          date: {
            before: date
          }
        }
      },
      equals: (date: string) => {
        return {
          property: propertyName,
          date: {
            equals: date
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          date: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          date: {
            is_not_empty: true
          }
        }
      },
      next_month: () => {
        return {
          property: propertyName,
          date: {
            next_month: {}
          }
        }
      },
      next_week: () => {
        return {
          property: propertyName,
          date: {
            next_week: {}
          }
        }
      },
      next_year: () => {
        return {
          property: propertyName,
          date: {
            next_year: {}
          }
        }
      },
      on_or_after: (date: string) => {
        return {
          property: propertyName,
          date: {
            on_or_after: date
          }
        }
      },
      on_or_before: (date: string) => {
        return {
          property: propertyName,
          date: {
            on_or_before: date
          }
        }
      },
      past_month: () => {
        return {
          property: propertyName,
          date: {
            past_month: {}
          }
        }
      },
      past_week: () => {
        return {
          property: propertyName,
          date: {
            past_week: {}
          }
        }
      },
      past_year: () => {
        return {
          property: propertyName,
          date: {
            past_year: {}
          }
        }
      },
      this_week: () => {
        return {
          property: propertyName,
          date: {
            this_week: {}
          }
        }
      }
    }
  },
  files: (propertyName: string) => {
    return {
      is_empty: () => {
        return {
          property: propertyName,
          files: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          files: {
            is_not_empty: true
          }
        }
      }
    }
  },
  multi_select: (propertyName: string) => {
    return {
      contains: (keyword: string) => {
        return {
          property: propertyName,
          files: {
            contains: keyword
          }
        }
      },
      does_not_contain: (keyword: string) => {
        return {
          property: propertyName,
          files: {
            does_not_contain: keyword
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          files: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          files: {
            is_not_empty: true
          }
        }
      }
    }
  },
  number: (propertyName: string) => {
    return {
      equals: (value: number) => {
        return {
          property: propertyName,
          number: {
            equals: value
          }
        }
      },
      does_not_equal: (value: number) => {
        return {
          property: propertyName,
          number: {
            does_not_equal: value
          }
        }
      },
      greater_than: (value: number) => {
        return {
          property: propertyName,
          number: {
            greater_than: value
          }
        }
      },
      greater_than_or_equal_to: (value: number) => {
        return {
          property: propertyName,
          number: {
            greater_than_or_equal_to: value
          }
        }
      },
      less_than: (value: number) => {
        return {
          property: propertyName,
          number: {
            less_than: value
          }
        }
      },
      less_than_or_equal_to: (value: number) => {
        return {
          property: propertyName,
          number: {
            less_than_or_equal_to: value
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          number: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          number: {
            is_not_empty: true
          }
        }
      }
    }
  },
  people: (propertyName: string) => {
    return {
      contains: (userId: string) => {
        return {
          property: propertyName,
          people: {
            contains: userId
          }
        }
      },
      does_not_contain: (id: string) => {
        return {
          property: propertyName,
          people: {
            does_not_contain: id
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          people: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          people: {
            is_not_empty: true
          }
        }
      }
    }
  },
  relation: (propertyName: string) => {
    return {
      contains: (relationId: string) => {
        return {
          property: propertyName,
          relation: {
            contains: relationId
          }
        }
      },
      does_not_contain: (relationId: string) => {
        return {
          property: propertyName,
          relation: {
            does_not_contain: relationId
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          relation: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          relation: {
            is_not_empty: true
          }
        }
      }
    }
  },
  rich_text: (propertyName: string) => {
    return {
      contains: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            contains: text
          }
        }
      },
      does_not_contain: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            does_not_contain: text
          }
        }
      },
      equals: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            equals: text
          }
        }
      },
      does_not_equal: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            does_not_equal: text
          }
        }
      },
      starts_with: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            starts_with: text
          }
        }
      },
      ends_with: (text: string) => {
        return {
          property: propertyName,
          rich_text: {
            ends_with: text
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          rich_text: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          rich_text: {
            is_not_empty: true
          }
        }
      }
    }
  },
  select: (propertyName: string) => {
    return {
      contains: (value: string) => {
        return {
          property: propertyName,
          select: {
            contains: value
          }
        }
      },
      does_not_contain: (value: string) => {
        return {
          property: propertyName,
          select: {
            does_not_contain: value
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          select: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          select: {
            is_not_empty: true
          }
        }
      }
    }
  },
  status: (propertyName: string) => {
    return {
      equals: (value: string) => {
        return {
          property: propertyName,
          status: {
            equals: value
          }
        }
      },
      does_not_equal: (value: string) => {
        return {
          property: propertyName,
          status: {
            does_not_equal: value
          }
        }
      },
      is_empty: () => {
        return {
          property: propertyName,
          status: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          property: propertyName,
          status: {
            is_not_empty: true
          }
        }
      }
    }
  },
  timestamp: (type: 'created_time' | 'last_edited_time') => {
    return {
      after: (date: string) => {
        return {
          timestamp: type,
          [type]: {
            after: date
          }
        }
      },
      before: (date: string) => {
        return {
          timestamp: type,
          [type]: {
            before: date
          }
        }
      },
      equals: (date: string) => {
        return {
          timestamp: type,
          [type]: {
            equals: date
          }
        }
      },
      is_empty: () => {
        return {
          timestamp: type,
          [type]: {
            is_empty: true
          }
        }
      },
      is_not_empty: () => {
        return {
          timestamp: type,
          [type]: {
            is_not_empty: true
          }
        }
      },
      on_or_after: (date: string) => {
        return {
          timestamp: type,
          [type]: {
            on_or_after: date
          }
        }
      },
      on_or_before: (date: string) => {
        return {
          timestamp: type,
          [type]: {
            on_or_before: date
          }
        }
      },
      next_month: () => {
        return {
          timestamp: type,
          [type]: {
            next_month: {}
          }
        }
      },
      next_week: () => {
        return {
          timestamp: type,
          [type]: {
            next_week: {}
          }
        }
      },
      next_year: () => {
        return {
          timestamp: type,
          [type]: {
            next_year: {}
          }
        }
      },
      past_month: () => {
        return {
          timestamp: type,
          [type]: {
            past_month: {}
          }
        }
      },
      past_week: () => {
        return {
          timestamp: type,
          [type]: {
            past_week: {}
          }
        }
      },
      past_year: () => {
        return {
          timestamp: type,
          [type]: {
            past_year: {}
          }
        }
      },
      this_week: () => {
        return {
          timestamp: type,
          [type]: {
            this_week: {}
          }
        }
      }
    }
  },
  id: (propertyName: string) => {
    return {
      equals: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            equals: value
          }
        }
      },
      does_not_equal: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            does_not_equal: value
          }
        }
      },
      greater_than: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            greater_than: value
          }
        }
      },
      greater_than_or_equal_to: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            greater_than_or_equal_to: value
          }
        }
      },
      less_than: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            less_than: value
          }
        }
      },
      less_than_or_equal_to: (value: number) => {
        return {
          property: propertyName,
          unique_id: {
            less_than_or_equal_to: value
          }
        }
      }
    }
  },
  rollup: (propertyName: string) => {
    return {
      any: (rollupCondition: any) => {
        return {
          property: propertyName,
          rollup: {
            any: rollupCondition
          }
        }
      },
      every: (rollupCondition: any) => {
        return {
          property: propertyName,
          rollup: {
            every: rollupCondition
          }
        }
      },
      none: (rollupCondition: any) => {
        return {
          property: propertyName,
          rollup: {
            none: rollupCondition
          }
        }
      }
    }
  },
  createRollupCondition: (
    filterType:
      | 'checkbox'
      | 'date'
      | 'files'
      | 'formula'
      | 'multi_select'
      | 'number'
      | 'people'
      | 'relation'
      | 'rich_text'
      | 'select'
      | 'status'
      | 'select'
      | 'timestamp'
      | 'id',
    condition: any
  ) => {
    switch (filterType) {
      case 'checkbox':
        return { checkbox: condition }
      case 'date':
        return { date: condition }
      case 'files':
        return { files: condition }
      case 'formula':
        return { formula: condition }
      case 'multi_select':
        return { formula: condition }
      case 'number':
        return { number: condition }
      case 'people':
        return { people: condition }
      case 'relation':
        return { relation: condition }
      case 'rich_text':
        return { rich_text: condition }
      case 'select':
        return { select: condition }
      case 'status':
        return { status: condition }
      case 'timestamp':
        return { timestamp: condition }
      case 'id':
        return { unique_id: condition }
    }
  }
}
