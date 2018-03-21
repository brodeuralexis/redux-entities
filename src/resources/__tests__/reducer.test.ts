import { resourcesReducer } from '../reducer'
import { initialState, setResources, unsetResources } from '../state'
import { setResource, unsetResource, SetResourcesAction, UnsetResourcesAction } from '../actions'
import { Loaded } from '../../loadable'

describe(`${resourcesReducer.name}/2`, function () {
  it('should not change the state in any way if the action is not known', function () {
    expect(
      resourcesReducer(initialState, { type: '<some other action>' } as any)
    ).toEqual(initialState)
  })

  it(`should delegate the state modification to the '${setResources.name}/3' function from the 'state' module for a '${SetResourcesAction.toString()}'`, function () {
    const action = setResource('<type>', '<id>', Loaded({ id: '<id>' }))

    expect(
      resourcesReducer(initialState, action)
    ).toEqual(
      setResources(initialState, '<type>', { '<id>': Loaded({ id: '<id>' }) })
    )
  })

  it(`should delegate the state modification to the '${unsetResources.name}/3' function from the 'state' module for an '${UnsetResourcesAction.toString()}'`, function () {
    const action = unsetResource('<type>', '<id>')

    expect(
      resourcesReducer({
        '<type>': {
          '<id>': Loaded({ id: '<id>' })
        }
      }, action)
    ).toEqual(
      unsetResources({
        '<type>': {
          '<id>': Loaded({ id: '<id>' })
        }
      }, '<type>', ['<id>'])
    )
  })
})
