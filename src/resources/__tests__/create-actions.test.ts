import { createActions } from '../create-actions'

import { setResource, setResources, unsetResource, unsetResources } from '../actions'
import { Loaded } from '../../loadable'

const actions = createActions('<resourceType>')

describe(`${createActions.name}/1`, function () {
  describe(`${actions.setResource.name}/2`, function () {
    it(`should partially apply '${setResource.name}/3' for the 'resourceType' parameter`, function () {
      expect(
        actions.setResource('1', Loaded({ id: '1' }))
      ).toEqual(
        setResource('<resourceType>', '1', Loaded({ id: '1' }))
      )
    })
  })

  describe(`${actions.setResources.name}/2`, function () {
    it(`should partially apply '${setResource.name}/2' for the 'resourceType' parameter`, function () {
      expect(
        actions.setResources({ '2': Loaded({ id: '2' }) })
      ).toEqual(
        setResources('<resourceType>', { '2': Loaded({ id: '2' }) })
      )
    })
  })

  describe(`${actions.unsetResource.name}/1`, function () {
    it(`should partially apply '${unsetResource.name}/2' for the 'resourceType' parameter`, function () {
      expect(
        actions.unsetResource('2')
      ).toEqual(
        unsetResource('<resourceType>', '2')
      )
    })
  })

  describe(`${actions.unsetResources.name}/1`, function () {
    it(`should partially apply '${unsetResources.name}/1' for the 'resourceType' parameter`, function () {
      expect(
        actions.unsetResources(['2', '3'])
      ).toEqual(
        unsetResources('<resourceType>', ['2', '3'])
      )
    })
  })
})
