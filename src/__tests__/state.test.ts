import { setEntities, unsetEntities, EntitiesState } from '../state'

const state: EntitiesState = {
  '<type>': {
    '1': {
      id: '1'
    },
    '2': {
      id: '2'
    },
    '3': {
      id: '3'
    }
  }
}

describe('setEntities/3', function () {
  it('should set the entities on the state', function () {
    expect(
      setEntities(state, '<type>', { '3': { id: '3' }, '4': { id: '4' } })
    ).toEqual({
      '<type>': {
        ...state['<type>'],
        '3': {
          id: '3'
        },
        '4': {
          id: '4'
        }
      }
    })
  })

  it('should create a new type if it does not already exist', function () {
    expect(
      setEntities(state, '<new type>', { '3': { id: '3' } })
    ).toEqual({
      ...state,
      '<new type>': {
        '3': {
          id: '3'
        }
      }
    })
  })

  it('should overwrite old entities already present in the state', function () {
    expect(
      setEntities(state, '<type>', { '1': { id: '1', modified: true } })
    ).toEqual({
      ...state,
      '<type>': {
        ...state['<type>'],
        '1': {
          id: '1',
          modified: true
        }
      }
    })
  })
})

describe('unsetEntities/3', function () {
  it('should remove the entities with the specified `id`s', function () {
    expect(
      unsetEntities(state, '<type>', ['1', '2'])
    ).toEqual({
      '<type>': {
        '3': {
          id: '3'
        }
      }
    })
  })

  it('should do nothing if the type is invalid', function () {
    expect(
      unsetEntities(state, '<invalid type>', ['1', '2'])
    ).toBe(state)
  })

  it('should should omit removing an entity that does not exist', function () {
    expect(
      unsetEntities(state, '<type>', ['1', '-1'])
    ).toEqual({
      '<type>': {
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
