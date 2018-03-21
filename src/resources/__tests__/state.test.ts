import { setResources, unsetResources, ResourcesState } from '../state'
import { Loaded } from '../../loadable';

const state: ResourcesState = {
  '<resourceType>': {
    '1': Loaded({
      id: '1'
    }),
    '2': Loaded({
      id: '2'
    }),
    '3': Loaded({
      id: '3'
    })
  }
}

describe(`${setResources.name}/3`, function () {
  it('should set the resources on the state', function () {
    expect(
      setResources(state, '<resourceType>', { '3': Loaded({ id: '3' }), '4': Loaded({ id: '4' }) })
    ).toEqual({
      '<resourceType>': {
        ...state['<resourceType>'],
        '3': {
          id: '3'
        },
        '4': {
          id: '4'
        }
      }
    })
  })

  it('should create a new resource type if it does not already exist', function () {
    expect(
      setResources(state, '<new resourceType>', { '3': Loaded({ id: '3' }) })
    ).toEqual({
      ...state,
      '<new resourceType>': {
        '3': {
          id: '3'
        }
      }
    })
  })

  it('should overwrite old resources already present in the state', function () {
    expect(
      setResources(state, '<resourceType>', { '1': Loaded({ id: '1', modified: true }) })
    ).toEqual({
      ...state,
      '<resourceType>': {
        ...state['<resourceType>'],
        '1': {
          id: '1',
          modified: true
        }
      }
    })
  })
})

describe(`${unsetResources.name}/3`, function () {
  it('should remove the resources with the specified `id`s', function () {
    expect(
      unsetResources(state, '<resourceType>', ['1', '2'])
    ).toEqual({
      '<resourceType>': {
        '3': {
          id: '3'
        }
      }
    })
  })

  it('should do nothing if the resource type is invalid', function () {
    expect(
      unsetResources(state, '<invalid resourceType>', ['1', '2'])
    ).toBe(state)
  })

  it('should should omit removing a resource that does not exist', function () {
    expect(
      unsetResources(state, '<resourceType>', ['1', '-1'])
    ).toEqual({
      '<resourceType>': {
        '2': {
          id: '2'
        },
        '3': {
          id: '3'
        }
      }
    })
  })
})
