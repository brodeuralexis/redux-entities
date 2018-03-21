import { getResources, getResourcesSafe, getResource, hasResource } from '../selectors'
import { State, resourcesKey } from '../state'

const state: State = {
  [resourcesKey]: {
    '<resourceType>': {
      '1': {
        id: '1'
      },
      '2': {
        id: '2'
      }
    }
  }
}

describe(`${getResource.name}/3`, function () {
  it('should return the resource if it exist', function () {
    expect(
      getResource(state, '<resourceType>', '1')
    ).toEqual({
      id: '1'
    })
  })

  it('should return `null` if the resource type is invalid', function () {
    expect(
      getResource(state, '<invalid resourceType>', '1')
    ).toBeNull()
  })

  it('should return null if the resource does not exist', function () {
    expect(
      getResource(state, '<resourceType>', '-1')
    ).toBeNull()
  })
})

describe(`${getResources.name}/3`, function () {
  it('should return the specified resources', function () {
    expect(
      getResources(state, '<resourceType>', ['1', '2'])
    ).toEqual([
      {
        id: '1'
      },
      {
        id: '2'
      }
    ])
  })

  it('should return the specified resources in the right order', function () {
    expect(
      getResources(state, '<resourceType>', ['2', '1'])
    ).toEqual([
      {
        id: '2'
      },
      {
        id: '1'
      }
    ])
  })

  it('should throw an error if the resource type does not exist', function () {
    expect(function () {
      getResources(state, '<invalid resourceType>', ['1', '2'])
    }).toThrow(Error)
  })

  it('should throw an error if any of the resource does not exist', function () {
    expect(function () {
      getResources(state, '<resourceType>', ['-1'])
    }).toThrow(Error)
  })
})

describe(`${getResourcesSafe.name}/2`, function () {
  it(`should behave the same as '${getResources.name}/2' for valid entities`, function () {
    const resourceType = '<resourceType>'
    const ids = ['1', '2']

    expect(
      getResourcesSafe(state, resourceType, ids)
    ).toEqual(
      getResources(state, resourceType, ids)
    )
  })

  it('should return an empty array if the resource type is invalid', function () {
    expect(
      getResourcesSafe(state, '<invalid resourceType>', ['1', '2'])
    ).toEqual([])
  })

  it('should omit resources that do not exist', function () {
    expect(
      getResourcesSafe(state, '<resourceType>', ['2', '3', '1'])
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

describe(`${hasResource.name}/3`, function () {
  it('should return `true` if the resource exists', function () {
    expect(
      hasResource(state, '<resourceType>', '1')
    ).toBe(true)
  })

  it('should return `false` if the resource type does not exist', function () {
    expect(
      hasResource(state, '<invalid resourceType>', '1')
    ).toBe(false)
  })

  it('should return `false` if the resource does not exist', function () {
    expect(
      hasResource(state, '<resourceType>', '-1')
    ).toBe(false)
  })
})
