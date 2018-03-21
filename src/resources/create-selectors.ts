import { State, Type } from './state'
import { getResource, getResources, getResourcesSafe, hasResource } from './selectors'

/**
 * Creates selectors partially applied for a given type of resources.
 * @param resourceType A unique key representing the type of resources
 */
export function createSelectors<T = {}> (resourceType: Type) {
  return {
    getResource (state: State, id: string): T | null {
      return getResource<T>(state, resourceType, id)
    },
    getResources (state: State, ids: string[]): T[] {
      return getResources<T>(state, resourceType, ids)
    },
    getResourcesSafe (state: State, ids: string[]): T[] {
      return getResourcesSafe<T>(state, resourceType, ids)
    },
    hasResource (state: State, id: string): boolean {
      return hasResource(state, resourceType, id)
    }
  }
}
