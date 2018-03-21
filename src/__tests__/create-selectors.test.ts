import { createSelectors } from '../create-selectors'
import { entitiesKey } from '../state'
import { getEntity, getEntities, getEntitiesSafe, hasEntity } from '../selectors'

const selectors = createSelectors('<type>')

const state = {
  [entitiesKey]: {
    '<type>': {
      '1': { id: '1' },
      '2': { id: '2' }
    }
  }
}

describe('createSelectors/1', function () {
  describe('getEntity/2', function () {
    it('should partially apply `getEntity/2` for the `type` parameter', function () {
      expect(
        selectors.getEntity(state, '1')
      ).toEqual(
        getEntity(state, '<type>', '1')
      )

      expect(
        selectors.getEntity(state, '-1')
      ).toEqual(
        getEntity(state, '<type>', '-1')
      )
    })
  })

  describe('getEntities/2', function () {
    it('should partially apply `getEntities/3` for the `type` parameter', function () {
      expect(
        selectors.getEntities(state, ['1', '2'])
      ).toEqual(
        getEntities(state, '<type>', ['1', '2'])
      )
    })
  })

  describe('getEntitiesSafe/2', function () {
    it('should partially apply `getEntitiesSafe/2` for the `type` parameter', function () {
      expect(
        selectors.getEntitiesSafe(state, ['1', '2', '3'])
      ).toEqual(
        getEntitiesSafe(state, '<type>', ['1', '2', '3'])
      )
    })
  })

  describe('hasEntity/2', function () {
    it('should partially apply `hasEntity/3` for the `type` parameter', function () {
      expect(
        selectors.hasEntity(state, '1')
      ).toEqual(
        hasEntity(state, '<type>', '1')
      )

      expect(
        selectors.hasEntity(state, '-1')
      ).toEqual(
        hasEntity(state, '<type>', '-1')
      )
    })
  })
})
