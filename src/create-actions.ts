import { TypedEntities } from './state'
import { setEntities, setEntity, unsetEntities, unsetEntity, SetEntitiesAction, UnsetEntitiesAction } from './actions'

/**
 * Creates action creators for the given entity type.
 * @param type The type of the entity
 */
export function createActions<TType extends object> (type: string) {
  return {
    setEntity (id: string, entity: TType) {
      return setEntity(type, id, entity)
    },
    setEntities (entities: TypedEntities<TType>) {
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
