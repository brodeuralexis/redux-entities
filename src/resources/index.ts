/* tslint:disable */
import { SetResourcesAction, UnsetResourcesAction } from './actions'
import { resourcesKey } from './state'
import { resourcesReducer } from './reducer'

import { createActions } from './create-actions'
import { createActionMatchers } from './create-action-matchers'
import { createSelectors } from './create-selectors'
/* tslint:enable */

export function createResource<TEntity extends object> (type: string | symbol) {
  return {
    ...createActionMatchers<TEntity>(type),
    ...createActions<TEntity>(type),
    ...createSelectors<TEntity>(type)
  }
}

export { createActions } from './create-actions'
export { createActionMatchers } from './create-action-matchers'
export { createSelectors } from './create-selectors'

export const resources = {
  [resourcesKey]: resourcesReducer
}

export { resourcesReducer } from './reducer'
export { resourcesKey } from './state'
