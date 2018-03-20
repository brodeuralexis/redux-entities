import { entitiesReducer } from '../reducer'
import { initialState, setEntities, entitiesKey, unsetEntities } from '../state'
import { setEntity, unsetEntity } from '../actions'

describe('entitiesReducer/2', function () {
  it('should not change the state in any way if the action is not known', function () {
    expect(
      entitiesReducer(initialState, { type: '<some other action>' } as any)
    ).toEqual(initialState)
  })

  it('should delegate the state modification to the `setEntities/3` function from the `state` module for a `SetEntitiesAction`', function () {
    const action = setEntity('<type>', '<id>', { id: '<id>' })

    expect(
      entitiesReducer(initialState, action)
    ).toEqual(
      setEntities(initialState, '<type>', { '<id>': { id: '<id>' } })
    )
  })

  it('should delegate the state modification to the `unsetEntities/3` function from the `state` module for an `UnsetEntitiesAction`', function () {
    const action = unsetEntity('<type>', '<id>')

    expect(
      entitiesReducer({
        '<type>': {
          '<id>': { id: '<id>' }
        }
      }, action)
    ).toEqual(
      unsetEntities({
        '<type>': {
          '<id>': { id: '<id>' }
        }
      }, '<type>', ['<id>'])
    )
  })
})
