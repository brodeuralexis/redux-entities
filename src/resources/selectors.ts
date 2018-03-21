import { Loadable, NotLoaded } from '../loadable'

import { State, Type, resourcesKey } from './state'

/**
 * Returns the resource with the given `type` and `id`.  If the resource does
 * not exist, return `null`.
 * @param state The state
 * @param resourceType The type of the resource
 * @param id The id of the resource
 * @returns An resource or `null`
 */
export function getResource<T = {}, E = Error> (state: State, resourceType: Type, id: string): Loadable<T, E> {
  const resources = state[resourcesKey][resourceType]

  if (!resources) {
    return NotLoaded()
  }

  return resources[id] || NotLoaded()
}

/**
 * Returns a list of resources for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid resource, an error is throw.
 * @param state The state
 * @param resourceType The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export function getResources<T = {}, E = Error> (state: State, resourceType: Type, ids: string[]): Loadable<T, E>[] {
  return ids.map(function (id) {
    return getResource(state, resourceType, id)
  })
}

/**
 * Returns a list of resources for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid resource, it is ignored in the resulting
 * array.
 * @param state The state
 * @param resourceType The type of the resources
 * @param ids An array of resource id
 * @returns An array of resources
 */
export function getResourcesSafe<T = {}, E = Error> (state: State, resourceType: Type, ids: string[]): Loadable<T, E>[] {
  console.warn(`'${getResourcesSafe.name}/${getResourcesSafe.length}' is deprecated`)

  return ids.reduce<Loadable<T, E>[]>(function (resources, id) {
    const resource = getResource<T, E>(state, resourceType, id)

    if (resource) {
      resources.push(resource)
    }

    return resources
  }, [])
}

/**
 * Indicates if an resources is present in the state by it's given `id`.
 * @param state The state
 * @param resourceType The type of resource
 * @param resourceId The `id` of the resource
 * @returns The resource's presence
 */
export function hasResource (state: State, resourceType: Type, resourceId: string): boolean {
  return getResource(state, resourceType, resourceId).match({
    Loaded: () => true,
    _: () => false
  })
}
