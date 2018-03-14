import { Action } from 'redux'

import { SetEntitiesAction, UnsetEntitiesAction } from './actions'
import { entitiesKey } from './state'
import { entitiesReducer } from './reducer'

import { createActions } from './create-actions'
import { createActionMatchers } from './create-action-matchers'
import { createSelectors } from './create-selectors'

export function createEntityHelpers<TType extends object> (type: string) {
  return {
    matchers: createActionMatchers<TType>(type),
    actions: createActions<TType>(type),
    selectors: createSelectors<TType>(type)
  }
}

export { createActions } from './create-actions'
export { createActionMatchers } from './create-action-matchers'
export { createSelectors } from './create-selectors'

export const entities = {
  [entitiesKey]: entitiesReducer
}

export { entitiesReducer } from './reducer'
export { entitiesKey } from './state'
