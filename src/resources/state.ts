/**
 * The key to use for this module.
 */
export const resourcesKey = Symbol('resources')

export type Type = string | symbol

/**
 * The part of the state this module knows about.
 */
export type State = {
  [resourcesKey]: ResourcesState
}

/**
 * The structure of the state associated with the reducer.
 */
export type ResourcesState = {
  [type: string]: Resources
}

/**
 * The map of resources.
 */
export type Resources<T = {}> = {
  [entityId: string]: T
}

/**
 * The initial value of the state.
 */
export const initialState: ResourcesState = {}

/**
 * Associates a given key with a given `id` for each provided resources.  If the
 * `id` already has an entry, it overrides the previous value.
 * @param state The state
 * @param type The type of the resources
 * @param entities The resources
 */
export function setResources<T = {}> (state: ResourcesState, type: Type, entities: Resources<T>): ResourcesState {
  const oldResources = state[type] || {}

  return {
    ...state,
    [type]: {
      ...oldResources,
      ...entities
    }
  }
}

/**
 * Removes the given `id`s from the map of resources.  If the resource with one
 * of the given `id` does not exist, do nothing.
 * @param state The state
 * @param type The type of the resources
 * @param ids The `id`s
 */
export function unsetResources (state: ResourcesState, type: Type, ids: string[]): ResourcesState {
  const oldResources = state[type]

  if (!oldResources) {
    return state
  }

  const newResources = {
    ...oldResources
  }

  for (const id of ids) {
    delete newResources[id]
  }

  return {
    ...state,
    [type]: newResources
  }
}
