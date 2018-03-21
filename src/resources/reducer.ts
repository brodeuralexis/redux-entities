import { ResourcesAction, SET_RESOURCES, UNSET_RESOURCES } from './actions'
import { ResourcesState, initialState, setResources, unsetResources } from './state'

/**
 * The reducer for the resources.
 * @param state The state
 * @param action An action
 * @returns The new value of the state
 */
export function resourcesReducer (state: ResourcesState = initialState, action: ResourcesAction): ResourcesState {
  switch (action.type) {
    case SET_RESOURCES: {
      return setResources(state, action.payload.resourceType, action.payload.resources)
    }
    case UNSET_RESOURCES: {
      return unsetResources(state, action.payload.resourceType, action.payload.resourceIds)
    }
    default: {
      return state
    }
  }
}
