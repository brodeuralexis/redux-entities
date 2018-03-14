import { State, entitiesKey } from './state'
import { getEntity, getEntities, getEntitiesSafe, hasEntity } from './selectors'

/**
 * Creates selectors partially applied for a given type.
 * @param type A unique key representing the type of entities
 */
export function createSelectors<TType extends object> (type: string) {
  return {
    getEntity (state: State, id: string): TType | null {
      return getEntity(state, type, id) as TType | null
    },
    getEntities (state: State, ids: string[]): TType[] {
      return getEntities(state, type, ids) as TType[]
    },
    getEntitiesSafe (state: State, ids: string[]): TType[] {
      return getEntitiesSafe(state, type, ids) as TType[]
    },
    hasEntity (state: State, id: string): boolean {
      return hasEntity(state, type, id)
    }
  }
}
