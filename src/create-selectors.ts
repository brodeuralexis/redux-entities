import { State, entitiesKey, Type } from './state'
import { getEntity, getEntities, getEntitiesSafe, hasEntity } from './selectors'

/**
 * Creates selectors partially applied for a given type.
 * @param type A unique key representing the type of entities
 */
export function createSelectors<TEntity extends object> (type: Type) {
  return {
    getEntity (state: State, id: string): TEntity | null {
      return getEntity(state, type, id) as TEntity | null
    },
    getEntities (state: State, ids: string[]): TEntity[] {
      return getEntities(state, type, ids) as TEntity[]
    },
    getEntitiesSafe (state: State, ids: string[]): TEntity[] {
      return getEntitiesSafe(state, type, ids) as TEntity[]
    },
    hasEntity (state: State, id: string): boolean {
      return hasEntity(state, type, id)
    }
  }
}
