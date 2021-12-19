import {Second} from './second.entity'

export const secondStub = (): Second => {
  return { id: 1,
  name: 'Example',
  weight:200,
  calories: 200 || null,
  days: [],
}
}