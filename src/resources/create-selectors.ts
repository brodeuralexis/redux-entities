import { Loadable } from '../loadable'

import { State, Type } from './state'
import { getResource, getResources, getResourcesSafe, hasResource } from './selectors'

/**
 * Creates selectors partially applied for a given type of resources.
 * @param resourceType A unique key representing the type of resources
 */
export function createSelectors<T = {}, E = Error> (resourceType: Type) {
  return {
    getResource (state: State, id: string): Loadable<T, E> {
      return getResource<T, E>(state, resourceType, id)
    },
    getResources (state: State, ids: string[]): Loadable<T, E>[] {
      return getResources<T, E>(state, resourceType, ids)
    },
    getResourcesSafe (state: State, ids: string[]): Loadable<T, E>[] {
      return getResourcesSafe<T, E>(state, resourceType, ids)
    },
    hasResource (state: State, id: string): boolean {
      return hasResource(state, resourceType, id)
    }
  }
}
