import { setResources, unsetResources, setResource, unsetResource, SetResourcesAction, UnsetResourcesAction } from '../actions'

describe('setResources/3', function () {
  it('should return a `SetResourcesAction`', function () {
    const _: SetResourcesAction = setResources('<type>', { '<id>': { id: '<id>' } })
  })
})

describe('unsetResources/2', function () {
  it('should return a `UnsetResourcesAction`', function () {
    const _: UnsetResourcesAction = unsetResources('<type>', ['<id>'])
  })
})

describe('setResource/3', function () {
  it('should be an alias for `setResources/3` for working with a single resource', function () {
    const type = '<type>'
    const id = '<id>'
    const resource = { id }

    expect(
      setResource(type, id, resource)
    ).toEqual(
      setResources(type, { [id]: resource })
    )
  })
})

describe('unsetResource/2', function () {
  it('should be an alias for `unsetResources/2` for working with a single resource', function () {
    const type = '<type>'
    const id = '<id>'

    expect(
      unsetResource(type, id)
    ).toEqual(
      unsetResources(type, [id])
    )
  })
})
