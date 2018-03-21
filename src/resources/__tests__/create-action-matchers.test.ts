import { createActionMatchers } from '../create-action-matchers'
import { setResources, setResource, unsetResources, unsetResource, SetResourcesAction, UnsetResourcesAction } from '../actions'
import { Loaded } from '../../loadable'

const matchers = createActionMatchers('<type>')

describe(`${createActionMatchers.name}/1`, function () {
  describe(`${matchers.isSetResources.name}/1`, function () {
    it(`should return 'true' if the action is a '${SetResourcesAction.toString()}' for the right 'type'`, function () {
      expect(
        matchers.isSetResources(setResources('<type>', { '1': Loaded({ id: '1' }) }))
      ).toBe(true)
    })

    it(`should return 'false' if the 'type' is invalid`, function () {
      expect(
        matchers.isSetResources(setResources('<invalid type>', { '1': Loaded({ id: '1' }) }))
      ).toBe(false)
    })

    it(`should return 'false' if the action is not a '${SetResourcesAction.toString()}'`, function () {
      expect(
        matchers.isSetResources({ type: '<some other action>' })
      ).toBe(false)
    })
  })

  describe(`${matchers.isSetResource.name}/1`, function () {
    describe('_/1', function () {
      it('should return true if the given entity with the given type is changing', function () {
        expect(
          matchers.isSetResource('<id>')(setResource('<type>', '<id>', Loaded({ id: '<id>' })))
        ).toBe(true)
      })

      it('should return `false` if the type does not match', function () {
        expect(
          matchers.isSetResource('<id>')(setResource('<invalid type>', '<id>', Loaded({ id: '<id>' })))
        ).toBe(false)
      })

      it('should return `false` if the `id` does not match', function () {
        expect(
          matchers.isSetResource('<invalid id>')(setResource('<type>', '<id>', Loaded({ id: '<id>' })))
        ).toBe(false)
      })
    })
  })

  describe(`${matchers.isUnsetResources.name}/1`, function () {
    it(`should return 'true' if the action is a '${UnsetResourcesAction.toString()}' for the right 'type'`, function () {
      expect(
        matchers.isUnsetResources(unsetResources('<type>', ['1', '2']))
      ).toBe(true)
    })

    it(`should return 'false' if the 'type' does not match`, function () {
      expect(
        matchers.isUnsetResources(unsetResources('<invalid type>', ['1', '2']))
      ).toBe(false)
    })

    it(`should return 'false' if the action is not a '${UnsetResourcesAction.toString()}'`, function () {
      expect(
        matchers.isUnsetResources({ type: '<some other action>' })
      ).toBe(false)
    })
  })

  describe(`${matchers.isUnsetResource.name}/2`, function () {
    it(`should return 'true' if the action is a '${UnsetResourcesAction.toString()}' for the given resource by it's 'id'`, function () {
      expect(
        matchers.isUnsetResource('<id>')(unsetResource('<type>', '<id>'))
      ).toBe(true)
    })

    it(`should return 'false' if the 'type' does not match`, function () {
      expect(
        matchers.isUnsetResource('<id>')(unsetResource('<invalid type>', '<id>'))
      ).toBe(false)
    })

    it(`should return 'false' if the 'id' is not present in the entities to be removed`, function () {
      expect(
        matchers.isUnsetResource('<id>')(unsetResource('<type>', '<invalid id>'))
      ).toBe(false)
    })
  })
})
