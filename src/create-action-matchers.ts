import { Action, SetEntitiesAction, SET_ENTITIES, UnsetEntitiesAction, UNSET_ENTITIES } from './actions'
import { Type } from './state'

/**
 * Creates action matchers for a specific entity.
 * @param type The type of the entity
 */
export function createActionMatchers<TEntity extends object> (type: Type) {
  function _isSetEntities (action: Action): action is SetEntitiesAction {
    return action.type === SET_ENTITIES
  }

  function _isUnsetEntities (action: Action): action is UnsetEntitiesAction {
    return action.type === UNSET_ENTITIES
  }

  function isSetEntities (action: Action): action is SetEntitiesAction {
    return _isSetEntities(action) && action.payload.type === type
  }

  function isUnsetEntities (action: Action): action is UnsetEntitiesAction {
    return _isUnsetEntities(action) && action.payload.type === type
  }

  function isSetEntity (id: string) {
    return function (action: Action) {
      return isSetEntities(action) && id in action.payload.entities
    }
  }

  function isUnsetEntity (id: string) {
    return function (action: Action) {
      return isUnsetEntities(action) && action.payload.ids.indexOf(id) !== -1
    }
  }

  return {
    isSetEntities,
    isUnsetEntities,
    isSetEntity,
    isUnsetEntity
  }
}
