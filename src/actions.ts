import { Action } from 'redux'
import { Entities } from './state'

// #region SET_ENTITIES
/**
 * The type of the `SetEntitiesAction`.
 */
export const SET_ENTITIES = Symbol('@@redux-entities/SET_ENTITY')

/**
 * An action indicating the fact that the user wants to add entities to the
 * state.
 */
export interface SetEntitiesAction extends Action {
  type: typeof SET_ENTITIES,
  payload: {
    type: string,
    entities: Entities
  }
}

/**
 * Instructs the reducer the add the following entities of the given type to the
 * state.
 * @param type The type of the entities
 * @param entities The entities
 * @returns An `SetEntitiesAction`
 */
export function setEntities (type: string, entities: Entities): SetEntitiesAction {
  return {
    type: SET_ENTITIES,
    payload: {
      type,
      entities
    }
  }
}
// #endregion

// #region UNSET_ENTITIES
/**
 * The type of the `UnsetEntitiesAction`.
 */
export const UNSET_ENTITIES = Symbol('@@redux-entities/UNSET_ENTITIES')

/**
 * An action indicating the fact that the user wants to remove entities from the
 * state by their `id`s.
 */
export interface UnsetEntitiesAction extends Action {
  type: typeof UNSET_ENTITIES,
  payload: {
    type: string,
    ids: string[]
  }
}

/**
 * Removes all the entities with the given `id`s for the given `type`.
 * @param type The type of the entities
 * @param ids The `id`s of the entities
 * @returns An `UnsetEntitiesAction`
 */
export function unsetEntities (type: string, ids: string[]): UnsetEntitiesAction {
  return {
    type: UNSET_ENTITIES,
    payload: {
      type,
      ids
    }
  }
}
// #endregion

// #region Aliases
/**
 * Indicates that the user wants to add a given entity to the state.
 * @param type The type
 * @param id  The `id`
 * @param entity The entity
 * @returns A `SetEntitiesAction`
 */
export function setEntity (type: string, id: string, entity: object) {
  return setEntities(type, { [id]: entity })
}

/**
 * Indicates that the user wants to remove an entity by it's given `id`.
 * @param type The type
 * @param id The `id`
 * @returns An `UnsetEntitiesAction`
 */
export function unsetEntity (type: string, id: string) {
  return unsetEntities(type, [id])
}
// #endregion

export type EntitiesAction
  = SetEntitiesAction
  | UnsetEntitiesAction
