import { State, Type, entitiesKey } from './state'

/**
 * Returns the entity with the given `type` and `id`.  If the entity does not
 * exist, return `null`.
 * @param state The state
 * @param type The type of the entity
 * @param id The id of the entity
 * @returns An entity or `null`
 */
export function getEntity (state: State, type: Type, id: string): object | null {
  const entities = state[entitiesKey][type]

  if (!entities) {
    return null
  }

  return entities[id] as object || null
}

/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, an error is throw.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export function getEntities (state: State, type: Type, ids: string[]): object[] {
  if (!hasType(state, type)) {
    throw new Error(`Expected the "${type}" type to exist`)
  }

  return ids.map(function (id) {
    const entity = getEntity(state, type, id)

    if (entity == null) {
      throw new Error(`Expected the "${type}" with identified by "${id}" to exist`)
    }

    return entity
  })
}

/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, it is ignored in the resulting array.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export function getEntitiesSafe (state: State, type: Type, ids: string[]): object[] {
  return ids.reduce<object[]>(function (entities, id) {
    const entity = getEntity(state, type, id)

    if (entity) {
      entities.push(entity)
    }

    return entities
  }, [])
}

/**
 * Indicates if an entity is present in the state by it's given `id`.
 * @param state The state
 * @param type The type of entity
 * @param id The `id` of the entity
 * @returns The entity's presence
 */
export function hasEntity (state: State, type: Type, id: string): boolean {
  return getEntity(state, type, id) != null
}

function hasType (state: State, type: Type) {
  return state[entitiesKey][type] != null
}
