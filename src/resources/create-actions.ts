import { Resources, Type } from './state'
import { Loadable } from '../loadable'

/* tslint:disable */
import { setResources, setResource, unsetResources, unsetResource, SetResourcesAction, UnsetResourcesAction } from './actions'
/* tslint:enable */

/**
 * Creates action creators for the given resource type.
 * @param resourceType The type of the resource
 */
export function createActions<T = {}, E = Error> (resourceType: Type) {
  return {
    setResource (resourceId: string, resource: Loadable<T, E>) {
      return setResource<T, E>(resourceType, resourceId, resource)
    },
    setResources (resources: Resources<T, E>) {
      return setResources<T, E>(resourceType, resources)
    },
    unsetResource (resourceId: string) {
      return unsetResource<T, E>(resourceType, resourceId)
    },
    unsetResources (resourceIds: string[]) {
      return unsetResources<T, E>(resourceType, resourceIds)
    }
  }
}
