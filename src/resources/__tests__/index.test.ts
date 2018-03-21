import { resources, resourcesKey, resourcesReducer, createResource } from '../index'

describe(`resources`, function () {
  it(`should contain the '${resourcesReducer.name}' on the '${resourcesKey.toString()}' key`, function () {
    expect(
      resources
    ).toEqual({
      [resourcesKey]: resourcesReducer
    })
  })
})

describe(`${createResource}/1`, function () {
  const helpers = createResource('<type>')

  it('should expose action creators', function () {
    expect(helpers).toHaveProperty('setResource')
    expect(helpers).toHaveProperty('setResources')
    expect(helpers).toHaveProperty('unsetResource')
    expect(helpers).toHaveProperty('unsetResources')
  })

  it('should expose action matchers', function () {
    expect(helpers).toHaveProperty('isSetResource')
    expect(helpers).toHaveProperty('isSetResources')
    expect(helpers).toHaveProperty('isUnsetResource')
    expect(helpers).toHaveProperty('isSetResource')
  })

  it('should expose selectors', function () {
    expect(helpers).toHaveProperty('getResource')
    expect(helpers).toHaveProperty('getResources')
    expect(helpers).toHaveProperty('getResourcesSafe')
    expect(helpers).toHaveProperty('hasResource')
  })
})
