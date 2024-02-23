// @see https://developers.notion.com/reference/page-property-values#people

import { User, type UserResponseSimplified, type UserResponse } from '../other'

export interface PeoplePagePropertyResponse {
  id: string
  type: 'people'
  people: UserResponse[]
}

export type PeoplePagePropertyResponseSimplified = UserResponseSimplified[]

export class PeoplePageProperty {
  public readonly id: string
  public readonly type = 'people'
  public readonly people: User[]

  constructor(peoplePagePropertyResponse: PeoplePagePropertyResponse) {
    this.id = peoplePagePropertyResponse.id
    this.people = peoplePagePropertyResponse.people.map(
      (user) => new User(user)
    )
  }

  toJSON(): PeoplePagePropertyResponse {
    return {
      id: this.id,
      type: this.type,
      people: this.people.map((user) => user.toJSON())
    }
  }

  simplify(): PeoplePagePropertyResponseSimplified {
    return this.people.map((user) => user.simplify())
  }
}
