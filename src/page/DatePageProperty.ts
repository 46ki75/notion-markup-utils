// @see https://developers.notion.com/reference/page-property-values#date

export interface DatePagePropertyResponse {
  id: string
  type: 'date'
  date: {
    start: string
    end: string | null
    time_zone: string | null
  }
}

export interface DatePagePropertyResponseSimplified {
  start: string
  end: string | null
  time_zone: string | null
}

export class DatePageProperty {
  private readonly id: string
  private readonly type = 'date'
  private readonly date: {
    start: string
    end: string | null
    time_zone: string | null
  }

  constructor(datePagePropertyResponse: DatePagePropertyResponse) {
    this.id = datePagePropertyResponse.id
    this.date = datePagePropertyResponse.date
  }

  toJSON(): DatePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      date: this.date
    }
  }

  simplify(): DatePagePropertyResponseSimplified {
    return this.date
  }
}
