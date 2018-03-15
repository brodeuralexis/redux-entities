/**
 * The key to use for this module.
 */
export const entitiesKey = Symbol('entities')

export type Type = string | symbol

/**
 * The part of the state this module knows about.
 */
export type State = {
  [entitiesKey]: EntitiesState
}

/**
 * The structure of the state associated with the reducer.
 */
export type EntitiesState = {
  [type: string]: Entities
}

/**
 * The map of entities.
 */
export type Entities = {
  [id: string]: object
}

/**
 * A map of typed entities.
 */
export type TypedEntities<TType> = {
  [id: string]: TType
}

/**
 * The initial value of the state.
 */
export const initialState: EntitiesState = {}

/**
 * Associates a given key with a given `id` for each provided entities.  If the
 * `id` already has an entry, it overrides the previous value.
 * @param state The state
 * @param type The type of the entities
 * @param entities The entities
 */
export function setEntities (state: EntitiesState, type: Type, entities: Entities): EntitiesState {
  const oldEntities = state[type] || {}

  return {
    ...state,
    [type]: {
      ...oldEntities,
      ...entities
    }
  }
}

/**
 * Removes the given `id`s from the map of entities.  If the entity with one of
 * the given `id` does not exist, do nothing.
 * @param state The state
 * @param type The type of the entities
 * @param ids The `id`s
 */
export function unsetEntities (state: EntitiesState, type: Type, ids: string[]): EntitiesState {
  const oldEntities = state[type]

  if (oldEntities == null) {
    return state
  }

  const newEntities = {
    ...oldEntities
  }

  for (const id of ids) {
    delete newEntities[id]
  }

  return {
    ...state,
    [type]: newEntities
  }
}
