import { createActionMatchers } from '../create-action-matchers'
import { setEntities, setEntity, unsetEntities, unsetEntity } from '../actions'

const matchers = createActionMatchers('<type>')

describe('createActionMatchers/1', function () {
  describe('isSetEntities/1', function () {
    it('should return `true` if the action is a `SetEntitiesAction` for the right `type`', function () {
      expect(
        matchers.isSetEntities(setEntities('<type>', { '1': { id: '1' } }))
      ).toBe(true)
    })

    it('should return `false` if the `type` is invalid', function () {
      expect(
        matchers.isSetEntities(setEntities('<invalid type>', { '1': { id: '1' } }))
      ).toBe(false)
    })

    it('should return `false` if the action is not a `SetEntitiesAction`', function () {
      expect(
        matchers.isSetEntities({ type: '<some other action>' })
      ).toBe(false)
    })
  })

  describe('isSetEntity/1', function () {
    describe('_/1', function () {
      it('should return true if the given entity with the given type is changing', function () {
        expect(
          matchers.isSetEntity('<id>')(setEntity('<type>', '<id>', { id: '<id>' }))
        ).toBe(true)
      })

      it('should return `false` if the type does not match', function () {
        expect(
          matchers.isSetEntity('<id>')(setEntity('<invalid type>', '<id>', { id: '<id>' }))
        ).toBe(false)
      })

      it('should return `false` if the `id` does not match', function () {
        expect(
          matchers.isSetEntity('<invalid id>')(setEntity('<type>', '<id>', { id: '<id>' }))
        ).toBe(false)
      })
    })
  })

  describe('isUnsetEntities/1', function () {
    it('should return `true` if the action is a `UnseEntitiesAction` for the right `type`', function () {
      expect(
        matchers.isUnsetEntities(unsetEntities('<type>', ['1', '2']))
      ).toBe(true)
    })

    it('should return `false` if the `type` does not match', function () {
      expect(
        matchers.isUnsetEntities(unsetEntities('<invalid type>', ['1', '2']))
      ).toBe(false)
    })

    it('should return `false` if the action is not a `UnsetEntitiesAction`', function () {
      expect(
        matchers.isUnsetEntities({ type: '<some other action>' })
      ).toBe(false)
    })
  })

  describe('isUnsetEntity/2', function () {
    it('should return `true` if the action is a `UnsetEntitiesAction` for the given entity by it\'s `id`', function () {
      expect(
        matchers.isUnsetEntity('<id>')(unsetEntity('<type>', '<id>'))
      ).toBe(true)
    })

    it('should return `false` if the `type` does not match', function () {
      expect(
        matchers.isUnsetEntity('<id>')(unsetEntity('<invalid type>', '<id>'))
      ).toBe(false)
    })

    it('should return `false` if the `id` is not present in the entities to be removed', function () {
      expect(
        matchers.isUnsetEntity('<id>')(unsetEntity('<type>', '<invalid id>'))
      ).toBe(false)
    })
  })
})
