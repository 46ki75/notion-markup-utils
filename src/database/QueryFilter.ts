export type QueryFilter =
  | CheckboxFilter
  | DateFilter
  | FilesFilter
  | MultiSelectFilter

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
  timestamp: 'created_time'
  created_time?: Pick<DateFilter, 'date'>
  last_edited_time?: Pick<DateFilter, 'date'>
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

export class Filter {
  public readonly checkbox: {
    /**
     * Whether a checkbox property value matches the provided value exactly.
     * @param isChecked whether the checkbox is checked
     * @returns
     */
    equals: (isChecked: boolean) => CheckboxFilter
    /**
     * Whether a checkbox property value differs from the provided value.
     * @param isChecked whether the checkbox is checked
     * @returns
     */
    does_not_equal: (isChecked: boolean) => CheckboxFilter
  } = {
    equals: (isChecked: boolean) => {
      return {
        property: this.property,
        checkbox: {
          equals: isChecked
        }
      }
    },
    does_not_equal: (isChecked: boolean) => {
      return {
        property: this.property,
        checkbox: {
          does_not_equal: isChecked
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#date
   */
  public readonly date: {
    after: (date: Date) => DateFilter
    before: (date: Date) => DateFilter
    equals: (date: Date) => DateFilter
    is_empty: () => DateFilter
    is_not_empty: () => DateFilter
    next_month: () => DateFilter
    next_week: () => DateFilter
    next_year: () => DateFilter
    on_or_after: (date: Date) => DateFilter
    on_or_before: (date: Date) => DateFilter
    past_month: () => DateFilter
    past_week: () => DateFilter
    past_year: () => DateFilter
    this_week: () => DateFilter
  } = {
    after: (date: Date) => {
      return {
        property: this.property,
        date: {
          after: date.toISOString()
        }
      }
    },
    before: (date: Date) => {
      return {
        property: this.property,
        date: {
          before: date.toISOString()
        }
      }
    },
    equals: (date: Date) => {
      return {
        property: this.property,
        date: {
          equals: date.toISOString()
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        date: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        date: {
          is_not_empty: true
        }
      }
    },
    next_month: () => {
      return {
        property: this.property,
        date: { next_month: {} }
      }
    },
    next_week: () => {
      return {
        property: this.property,
        date: { next_week: {} }
      }
    },
    next_year: () => {
      return {
        property: this.property,
        date: { next_year: {} }
      }
    },
    on_or_after: (date: Date) => {
      return {
        property: this.property,
        date: {
          on_or_after: date.toISOString()
        }
      }
    },
    on_or_before: (date: Date) => {
      return {
        property: this.property,
        date: {
          on_or_before: date.toISOString()
        }
      }
    },
    past_month: () => {
      return {
        property: this.property,
        date: { past_month: {} }
      }
    },
    past_week: () => {
      return {
        property: this.property,
        date: { past_week: {} }
      }
    },
    past_year: () => {
      return {
        property: this.property,
        date: { past_year: {} }
      }
    },
    this_week: () => {
      return {
        property: this.property,
        date: { this_week: {} }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#files
   */
  public readonly files: {
    is_empty: () => FilesFilter
    is_not_empty: () => FilesFilter
  } = {
    is_empty: () => {
      return {
        property: this.property,
        files: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        files: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#multi-select
   */
  public readonly multi_select: {
    contains: (word: string) => MultiSelectFilter
    does_not_contain: (word: string) => MultiSelectFilter
    is_empty: () => MultiSelectFilter
    is_not_empty: () => MultiSelectFilter
  } = {
    contains: (word: string) => {
      return {
        property: this.property,
        multi_select: {
          contains: word
        }
      }
    },
    does_not_contain: (word: string) => {
      return {
        property: this.property,
        multi_select: {
          does_not_contain: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        multi_select: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        multi_select: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#number
   */
  public readonly number: {
    does_not_equal: (number: number) => NumberFilter
    equals: (number: number) => NumberFilter
    greater_than: (number: number) => NumberFilter
    greater_than_or_equal_to: (number: number) => NumberFilter
    is_empty: () => NumberFilter
    is_not_empty: () => NumberFilter
    less_than: (number: number) => NumberFilter
    less_than_or_equal_to: (number: number) => NumberFilter
  } = {
    does_not_equal: (number: number) => {
      return {
        property: this.property,
        number: {
          does_not_equal: number
        }
      }
    },
    equals: (number: number) => {
      return {
        property: this.property,
        number: {
          equals: number
        }
      }
    },
    greater_than: (number: number) => {
      return {
        property: this.property,
        number: {
          greater_than: number
        }
      }
    },
    greater_than_or_equal_to: (number: number) => {
      return {
        property: this.property,
        number: {
          greater_than_or_equal_to: number
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        number: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        number: {
          is_not_empty: true
        }
      }
    },
    less_than: (number: number) => {
      return {
        property: this.property,
        number: {
          less_than: number
        }
      }
    },
    less_than_or_equal_to: (number: number) => {
      return {
        property: this.property,
        number: {
          less_than_or_equal_to: number
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#people
   */
  public readonly poeple: {
    contains: (word: string) => PeopleFilter
    does_not_contain: (word: string) => PeopleFilter
    is_empty: () => PeopleFilter
    is_not_empty: () => PeopleFilter
  } = {
    contains: (word: string) => {
      return {
        property: this.property,
        people: {
          contains: word
        }
      }
    },
    does_not_contain: (word: string) => {
      return {
        property: this.property,
        people: {
          does_not_contain: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        people: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        people: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#relation
   */
  public readonly relation: {
    contains: (word: string) => RelationFilter
    does_not_contain: (word: string) => RelationFilter
    is_empty: () => RelationFilter
    is_not_empty: () => RelationFilter
  } = {
    contains: (word: string) => {
      return {
        property: this.property,
        relation: {
          contains: word
        }
      }
    },
    does_not_contain: (word: string) => {
      return {
        property: this.property,
        relation: {
          does_not_contain: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        relation: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        relation: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#rich-text
   */
  public readonly rich_text: {
    contains: (word: string) => RichTextFilter
    does_not_contain: (word: string) => RichTextFilter
    does_not_equal: (word: string) => RichTextFilter
    ends_with: (word: string) => RichTextFilter
    equals: (word: string) => RichTextFilter
    is_empty: () => RichTextFilter
    is_not_empty: () => RichTextFilter
    starts_with: (word: string) => RichTextFilter
  } = {
    contains: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          contains: word
        }
      }
    },
    does_not_contain: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          does_not_contain: word
        }
      }
    },
    does_not_equal: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          does_not_equal: word
        }
      }
    },
    ends_with: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          ends_with: word
        }
      }
    },
    equals: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          equals: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        rich_text: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        rich_text: {
          is_not_empty: true
        }
      }
    },
    starts_with: (word: string) => {
      return {
        property: this.property,
        rich_text: {
          starts_with: word
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#select
   */
  public readonly select: {
    contains: (word: string) => SelectFilter
    does_not_contain: (word: string) => SelectFilter
    is_empty: () => SelectFilter
    is_not_empty: () => SelectFilter
  } = {
    contains: (word: string) => {
      return {
        property: this.property,
        select: {
          contains: word
        }
      }
    },
    does_not_contain: (word: string) => {
      return {
        property: this.property,
        select: {
          does_not_contain: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        select: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        select: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#status
   */
  public readonly status: {
    equals: (word: string) => StatusFilter
    does_not_equal: (word: string) => StatusFilter
    is_empty: () => StatusFilter
    is_not_empty: () => StatusFilter
  } = {
    equals: (word: string) => {
      return {
        property: this.property,
        status: {
          equals: word
        }
      }
    },
    does_not_equal: (word: string) => {
      return {
        property: this.property,
        status: {
          does_not_equal: word
        }
      }
    },
    is_empty: () => {
      return {
        property: this.property,
        status: {
          is_empty: true
        }
      }
    },
    is_not_empty: () => {
      return {
        property: this.property,
        status: {
          is_not_empty: true
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#timestamp
   */
  public readonly timestamp: {
    created_time: Filter['date']
    last_edited_time: Filter['date']
  } = {
    created_time: this.date,
    last_edited_time: this.date
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#id
   */
  public readonly unique_id: {
    equals: (number: number) => IDFilter
    does_not_equal: (number: number) => IDFilter
    greater_than: (number: number) => IDFilter
    greater_than_or_equal_to: (number: number) => IDFilter
    less_than: (number: number) => IDFilter
    less_than_or_equal_to: (number: number) => IDFilter
  } = {
    equals: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          equals: number
        }
      }
    },
    does_not_equal: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          does_not_equal: number
        }
      }
    },
    greater_than: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          greater_than: number
        }
      }
    },
    greater_than_or_equal_to: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          greater_than_or_equal_to: number
        }
      }
    },
    less_than: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          less_than: number
        }
      }
    },
    less_than_or_equal_to: (number: number) => {
      return {
        property: this.property,
        unique_id: {
          less_than_or_equal_to: number
        }
      }
    }
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#formula
   */
  public readonly formula: {
    checkbox: Filter['checkbox']
    date: Filter['date']
    number: Filter['number']
    string: Filter['rich_text']
  } = {
    checkbox: this.checkbox,
    date: this.date,
    number: this.number,
    string: this.rich_text
  }

  /**
   * @see https://developers.notion.com/reference/post-database-query-filter#formula
   */
  public readonly rollup: {
    checkbox: Filter['checkbox']
    date: Filter['date']
    number: Filter['number']
    string: Filter['rich_text']
  } = {
    checkbox: this.checkbox,
    date: this.date,
    number: this.number,
    string: this.rich_text
  }

  /**
   *
   * @param property Property name (as the column name in the database)
   */
  constructor(private readonly property: string) {}
}
