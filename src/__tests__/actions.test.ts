import { setEntities, unsetEntities, setEntity, unsetEntity, SetEntitiesAction, UnsetEntitiesAction } from '../actions'

describe('setEntities/3', function () {
  it('should return a `SetEntitiesAction`', function () {
    const _: SetEntitiesAction = setEntities('<type>', { '<id>': { id: '<id>' } })
  })
})

describe('unsetEntities/2', function () {
  it('should return a `UnsetEntitiesAction`', function () {
    const _: UnsetEntitiesAction = unsetEntities('<type>', ['<id>'])
  })
})

describe('setEntity/3', function () {
  it('should be an alias for `setEntities/3` for working with a single entity', function () {
    const type = '<type>'
    const id = '<id>'
    const entity = { id }

    expect(
      setEntity(type, id, entity)
    ).toEqual(
      setEntities(type, { [id]: entity })
    )
  })
})

describe('unsetEntity/2', function () {
  it('should be an alias for `unsetEntities/2` for working with a single entity', function () {
    const type = '<type>'
    const id = '<id>'

    expect(
      unsetEntity(type, id)
    ).toEqual(
      unsetEntities(type, [id])
    )
  })
})
