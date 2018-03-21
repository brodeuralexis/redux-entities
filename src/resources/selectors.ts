import { State, Type, resourcesKey } from './state'

/**
 * Returns the resource with the given `type` and `id`.  If the resource does
 * not exist, return `null`.
 * @param state The state
 * @param resourceType The type of the resource
 * @param id The id of the resource
 * @returns An resource or `null`
 */
export function getResource<T = {}> (state: State, resourceType: Type, id: string): T | null {
  const resources = state[resourcesKey][resourceType]

  if (!resources) {
    return null
  }

  return (resources[id] || null) as T | null
}

/**
 * Returns a list of resources for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid resource, an error is throw.
 * @param state The state
 * @param resourceType The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export function getResources<T = {}> (state: State, resourceType: Type, ids: string[]): T[] {
  if (!hasResourceType(state, resourceType)) {
    throw new Error(`Expected the "${resourceType}" type to exist`)
  }

  return ids.map(function (id) {
    const resource = getResource(state, resourceType, id)

    if (!resource) {
      throw new Error(`Expected the "${resourceType}" with identified by "${id}" to exist`)
    }

    return resource
  }) as T[]
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
export function getResourcesSafe<T = {}> (state: State, resourceType: Type, ids: string[]): T[] {
  return ids.reduce<T[]>(function (resources, id) {
    const resource = getResource(state, resourceType, id)

    if (resource) {
      resources.push(resource as T)
    }

    return resources
  }, [])
}

/**
 * Indicates if an resources is present in the state by it's given `id`.
 * @param state The state
 * @param resourceType The type of resource
 * @param id The `id` of the resource
 * @returns The resource's presence
 */
export function hasResource (state: State, resourceType: Type, id: string): boolean {
  return Boolean(getResource(state, resourceType, id))
}

function hasResourceType (state: State, resourceType: Type) {
  return Boolean(state[resourcesKey][resourceType])
}
