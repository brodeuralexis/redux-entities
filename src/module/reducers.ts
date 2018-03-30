import { Loadable } from '../loadable'

import { OdysseyAction, SET_ENTITIES, UNSET_ENTITIES, SET_PAGES, UNSET_PAGES } from './actions'
import { ODYSSEY_KEY, $State, OdysseyState, initialEntityState } from './state'

export function odysseyReducer (state: OdysseyState, action: OdysseyAction<{}, {}>): OdysseyState {
  switch (action.type) {
    case SET_ENTITIES: {
      const { type, entities } = action.payload

      const entityState = state[type] || initialEntityState

      return {
        ...state,
        [type]: {
          ...entityState,
          entities: {
            ...entityState.entities,
            ...entities
          }
        }
      }
    }
    case UNSET_ENTITIES: {
      const { type, entityIds } = action.payload

      const entityState = state[type]

      if (entityState == null) {
        return state
      }

      const entities = { ...entityState.entities }

      entityIds.forEach(id => {
        delete entities[id]
      })

      return {
        ...state,
        [type]: {
          ...entityState,
          entities
        }
      }
    }
    case SET_PAGES: {
      const { type, pages } = action.payload

      const entityState = state[type] || initialEntityState

      return {
        ...state,
        [type]: {
          ...entityState,
          pages: {
            ...entityState.pages,
            ...pages
          }
        }
      }
    }
    case UNSET_PAGES: {
      const { type, pageIds } = action.payload

      const entityState = state[type]

      if (entityState == null) {
        return state
      }

      const pages = { ...entityState.pages }

      pageIds.forEach(id => {
        delete pages[id]
      })

      return {
        ...state,
        [type]: {
          ...entityState,
          pages
        }
      }
    }
    default: {
      return state
    }
  }
}

export default {
  [ODYSSEY_KEY]: odysseyReducer
}
