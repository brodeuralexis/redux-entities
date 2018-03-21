import { getEntities, getEntitiesSafe, getEntity, hasEntity } from '../selectors'
import { State, entitiesKey } from '../state'

const state: State = {
  [entitiesKey]: {
    '<type>': {
      '1': {
        id: '1'
      },
      '2': {
        id: '2'
      }
    }
  }
}

describe('getEntity/3', function () {
  it('should return the entity if it exist', function () {
    expect(
      getEntity(state, '<type>', '1')
    ).toEqual({
      id: '1'
    })
  })

  it('should return `null` if the type is invalid', function () {
    expect(
      getEntity(state, '<invalid type>', '1')
    ).toBeNull()
  })

  it('should return null if the entity does not exist', function () {
    expect(
      getEntity(state, '<type>', '-1')
    ).toBeNull()
  })
})

describe('getEntities/3', function () {
  it('should return the specified entities', function () {
    expect(
      getEntities(state, '<type>', ['1', '2'])
    ).toEqual([
      {
        id: '1'
      },
      {
        id: '2'
      }
    ])
  })

  it('should return the specified entities in the right order', function () {
    expect(
      getEntities(state, '<type>', ['2', '1'])
    ).toEqual([
      {
        id: '2'
      },
      {
        id: '1'
      }
    ])
  })

  it('should throw an error if the type does not exist', function () {
    expect(function () {
      getEntities(state, '<invalid type>', ['1', '2'])
    }).toThrow(Error)
  })

  it('should throw an error if any of the entity does not exist', function () {
    expect(function () {
      getEntities(state, '<type>', ['-1'])
    }).toThrow(Error)
  })
})

describe('getEntitiesSafe/2', function () {
  it('should behave the same as `getEntities/2` for valid entities', function () {
    const type = '<type>'
    const ids = ['1', '2']

    expect(
      getEntitiesSafe(state, type, ids)
    ).toEqual(
      getEntities(state, type, ids)
    )
  })

  it('should return an empty array if the type is invalid', function () {
    expect(
      getEntitiesSafe(state, '<invalid type>', ['1', '2'])
    ).toEqual([])
  })

  it('should omit entities that do not exist', function () {
    expect(
      getEntitiesSafe(state, '<type>', ['2', '3', '1'])
    ).toEqual([
      {
        id: '2'
      },
      {
        id: '1'
      }
    ])
  })
})

describe('hasEntity/3', function () {
  it('should return `true` if the entity exists', function () {
    expect(
      hasEntity(state, '<type>', '1')
    ).toBe(true)
  })

  it('should return `false` if the type does not exist', function () {
    expect(
      hasEntity(state, '<invalid type>', '1')
    ).toBe(false)
  })

  it('should return `false` if the entity does not exist', function () {
    expect(
      hasEntity(state, '<type>', '-1')
    ).toBe(false)
  })
})
