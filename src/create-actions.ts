import { TypedEntities, Type } from './state'
import { setEntities, setEntity, unsetEntities, unsetEntity, SetEntitiesAction, UnsetEntitiesAction } from './actions'

/**
 * Creates action creators for the given entity type.
 * @param type The type of the entity
 */
export function createActions<TEntity extends object> (type: Type) {
  return {
    setEntity (id: string, entity: TEntity) {
      return setEntity(type, id, entity)
    },
    setEntities (entities: TypedEntities<TEntity>) {
      return setEntities(type, entities)
    },
    unsetEntity (id: string) {
      return unsetEntity(type, id)
    },
    unsetEntities (ids: string[]) {
      return unsetEntities(type, ids)
    }
  }
}
