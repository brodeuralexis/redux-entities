import { entities, entitiesKey, entitiesReducer, createEntityHelpers } from '../index'

describe('entities', function () {
  it('should contain the `entitiesReducer` on the `entitiesKey` key', function () {
    expect(
      entities
    ).toEqual({
      [entitiesKey]: entitiesReducer
    })
  })
})

describe('createEntityHelpers/1', function () {
  const helpers = createEntityHelpers('<type>')

  it('should expose action creators', function () {
    expect(helpers).toHaveProperty('actions')
  })

  it('should expose action matchers', function () {
    expect(helpers).toHaveProperty('matchers')
  })

  it('should expose selectors', function () {
    expect(helpers).toHaveProperty('selectors')
  })
})
