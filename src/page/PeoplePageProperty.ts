// @see https://developers.notion.com/reference/page-property-values#people

import { User, type UserResponse } from '../other'

export interface PeoplePagePropertyResponse {
  id: string
  type: 'people'
  people: UserResponse[]
}

export class PeoplePageProperty {
  private readonly id: string
  private readonly type = 'people'
  private readonly people: UserResponse[]

  constructor(peoplePagePropertyResponse: PeoplePagePropertyResponse) {
    this.id = peoplePagePropertyResponse.id
    this.people = peoplePagePropertyResponse.people.map(
      (user) => new User(user)
    )
  }
}
