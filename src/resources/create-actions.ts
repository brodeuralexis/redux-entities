import { Resources, Type } from './state'
import { Loadable } from '../loadable'

/* tslint:disable */
import { setResources, setResource, unsetResources, unsetResource, SetResourcesAction, UnsetResourcesAction } from './actions'
/* tslint:enable */

/**
 * Creates action creators for the given resource type.
 * @param resourceType The type of the resource
 */
export function createActions<T = {}> (resourceType: Type) {
  return {
    setResource (resourceId: string, resource: Loadable<T>) {
      return setResource(resourceType, resourceId, resource)
    },
    setResources (resources: Resources<T>) {
      return setResources(resourceType, resources)
    },
    unsetResource (resourceId: string) {
      return unsetResource(resourceType, resourceId)
    },
    unsetResources (resourceIds: string[]) {
      return unsetResources(resourceType, resourceIds)
    }
  }
}
