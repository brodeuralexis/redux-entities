import { Action, EntitiesAction, SET_ENTITIES, UNSET_ENTITIES } from './actions'
import { EntitiesState, initialState, setEntities, unsetEntities } from './state'

/**
 * The reducer for the entities.
 * @param state The state
 * @param action An action
 * @returns The new value of the state
 */
export function entitiesReducer (state: EntitiesState, action: EntitiesAction): EntitiesState {
  switch (action.type) {
    case SET_ENTITIES: {
      return setEntities(state, action.payload.type, action.payload.entities)
    }
    case UNSET_ENTITIES: {
      return unsetEntities(state, action.payload.type, action.payload.ids)
    }
    default: {
      return state
    }
  }
}
