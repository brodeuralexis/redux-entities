import { createActions } from '../create-actions'

import { setEntity, setEntities, unsetEntity, unsetEntities } from '../actions'

const actions = createActions('<type>')

describe('createActions/1', function () {
  describe('setEntity/2', function () {
    it('should partially apply `getEntity/3` for the `type` parameter', function () {
      expect(
        actions.setEntity('1', { id: '1' })
      ).toEqual(
        setEntity('<type>', '1', { id: '1' })
      )
    })
  })

  describe('setEntities/2', function () {
    it('should partially apply `setEntities/3` for the `type` parameter', function () {
      expect(
        actions.setEntities({ '2': { id: '2' } })
      ).toEqual(
        setEntities('<type>', { '2': { id: '2' } })
      )
    })
  })

  describe('unsetEntity/1', function () {
    it('should partially apply `unsetEntity/2` for the `type` parameter', function () {
      expect(
        actions.unsetEntity('2')
      ).toEqual(
        unsetEntity('<type>', '2')
      )
    })
  })

  describe('unsetEntities/1', function () {
    it('should partially apply `unsetEntities/1` for the `type` parameter', function () {
      expect(
        actions.unsetEntities(['2', '3'])
      ).toEqual(
        unsetEntities('<type>', ['2', '3'])
      )
    })
  })
})
