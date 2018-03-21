import { createSelectors } from '../create-selectors'
import { resourcesKey } from '../state'
import { getResource, getResources, getResourcesSafe, hasResource } from '../selectors'

const selectors = createSelectors('<resourceType>')

const state = {
  [resourcesKey]: {
    '<resourceType>': {
      '1': { id: '1' },
      '2': { id: '2' }
    }
  }
}

describe(`${createSelectors.name}/1`, function () {
  describe(`${selectors.getResource.name}/2`, function () {
    it(`should partially apply '${getResource.name}/3' for the 'resourceType' parameter`, function () {
      expect(
        selectors.getResource(state, '1')
      ).toEqual(
        getResource(state, '<resourceType>', '1')
      )

      expect(
        selectors.getResource(state, '-1')
      ).toEqual(
        getResource(state, '<resourceType>', '-1')
      )
    })
  })

  describe(`${selectors.getResources.name}/2`, function () {
    it(`should partially apply '${getResources.name}/3' for the 'resourceType' parameter`, function () {
      expect(
        selectors.getResources(state, ['1', '2'])
      ).toEqual(
        getResources(state, '<resourceType>', ['1', '2'])
      )
    })
  })

  describe(`${selectors.getResourcesSafe.name}/2`, function () {
    it(`should partially apply '${getResourcesSafe.name}/3' for the 'resourceType' parameter`, function () {
      expect(
        selectors.getResourcesSafe(state, ['1', '2', '3'])
      ).toEqual(
        getResourcesSafe(state, '<resourceType>', ['1', '2', '3'])
      )
    })
  })

  describe(`${selectors.hasResource.name}/2`, function () {
    it(`should partially apply '${hasResource.name}/3' for the 'resourceType' parameter`, function () {
      expect(
        selectors.hasResource(state, '1')
      ).toEqual(
        hasResource(state, '<resourceType>', '1')
      )

      expect(
        selectors.hasResource(state, '-1')
      ).toEqual(
        hasResource(state, '<resourceType>', '-1')
      )
    })
  })
})
