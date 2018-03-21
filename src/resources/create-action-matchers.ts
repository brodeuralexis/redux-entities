import { SetResourcesAction, SET_RESOURCES, UnsetResourcesAction, UNSET_RESOURCES } from './actions'
import { Type } from './state'

/**
 * Creates action matchers for a specific resource.
 * @param resourceType The type of the resource
 */
export function createActionMatchers<_T = {}> (resourceType: Type) {
  function _isSetResources (action: any): action is SetResourcesAction {
    return typeof action === 'object' && action.type === SET_RESOURCES
  }

  function _isUnsetResources (action: any): action is UnsetResourcesAction {
    return typeof action === 'object' && action.type === UNSET_RESOURCES
  }

  function isSetResources (action: any): action is SetResourcesAction {
    return _isSetResources(action) && action.payload.resourceType === resourceType
  }

  function isUnsetResources (action: any): action is UnsetResourcesAction {
    return _isUnsetResources(action) && action.payload.resourceType === resourceType
  }

  function isSetResource (id: string) {
    return function (action: any) {
      return isSetResources(action) && id in action.payload.resources
    }
  }

  function isUnsetResource (id: string) {
    return function (action: any) {
      return isUnsetResources(action) && action.payload.resourceIds.indexOf(id) !== -1
    }
  }

  return {
    isSetResources,
    isUnsetResources,
    isSetResource,
    isUnsetResource
  }
}
