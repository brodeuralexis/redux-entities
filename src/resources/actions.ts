import { Resources, Type } from './state'
import { Loadable } from '../loadable'

// #region SET_RESOURCES
/**
 * The type of the `SetEntitiesAction`.
 */
export const SET_RESOURCES = Symbol('@@redux-entities/SET_RESOURCES')

export const SetResourcesAction = Symbol('SetResourcesAction')

/**
 * An action indicating the fact that the user wants to add resources to the
 * state.
 */
export interface SetResourcesAction<T = {}, E = Error> {
  type: typeof SET_RESOURCES,
  payload: {
    resourceType: Type,
    resources: Resources<T, E>
  }
}

/**
 * Instructs the reducer the add the following resources of the given type to
 * the state.
 * @param resourceType The type of the resources
 * @param resources The resources
 * @returns An `SetResourcesAction`
 */
export function setResources<T = {}, E = Error> (resourceType: Type, resources: Resources<T, E>): SetResourcesAction<T, E> {
  return {
    type: SET_RESOURCES,
    payload: {
      resourceType,
      resources
    }
  }
}
// #endregion

// #region UNSET_RESOURCES
/**
 * The type of the `UnsetResourcesAction`.
 */
export const UNSET_RESOURCES = Symbol('@@redux-entities/UNSET_RESOURCES')

export const UnsetResourcesAction = Symbol('UnsetResourcesAction')

/**
 * An action indicating the fact that the user wants to remove resources from
 * the state by their `id`s.
 */
export interface UnsetResourcesAction<_T = {}, _E = Error> {
  type: typeof UNSET_RESOURCES,
  payload: {
    resourceType: Type,
    resourceIds: string[]
  }
}

/**
 * Removes all the resources with the given `id`s for the given `type`.
 * @param resourceType The type of the resources
 * @param resourceIds The `id`s of the resources
 * @returns An `UnsetResourcesAction`
 */
export function unsetResources<T = {}, E = Error> (resourceType: Type, resourceIds: string[]): UnsetResourcesAction<T, E> {
  return {
    type: UNSET_RESOURCES,
    payload: {
      resourceType,
      resourceIds
    }
  }
}
// #endregion

// #region Aliases
/**
 * Indicates that the user wants to add a given resource to the state.
 * @param resourceType The type
 * @param resourceId  The `id`
 * @param resource The resource
 * @returns A `SetResourcesAction`
 */
export function setResource<T = {}, E = Error> (resourceType: Type, resourceId: string, resource: Loadable<T, E>) {
  return setResources<T, E>(resourceType, { [resourceId]: resource })
}

/**
 * Indicates that the user wants to remove a resource by it's given `id`.
 * @param resourceType The type
 * @param resourceId The `id`
 * @returns An `UnsetResourcesAction`
 */
export function unsetResource<T = {}, E = Error> (resourceType: Type, resourceId: string) {
  return unsetResources<T, E>(resourceType, [resourceId])
}
// #endregion

export type ResourcesAction
  = SetResourcesAction<any, any>
  | UnsetResourcesAction<any, any>
