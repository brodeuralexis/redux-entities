import { Loadable, NotLoaded, Failed, Loading, Loaded } from '../loadable'
import { ODYSSEY_KEY, OdysseyState, EntityState, initialEntityState, Page } from './state'

function getOdysseyState (state: any): OdysseyState {
  return state[ODYSSEY_KEY]
}

function getEntityState<TEntity, TPage, TEntityError = Error, TPageError = Error> (state: any, type: string | symbol): EntityState<TEntity, TPage, TEntityError, TPageError> {
  return getOdysseyState(state)[type] || initialEntityState
}

/**
 * Returns the entity with the given `type` and `entityId` from the state.
 * @param state The state of the application
 * @param type The type of the entity
 * @param entityId The id of the entity
 * @returns A `Loadable` entity
 */
export function getEntity<TEntity, TError = Error> (state: any, type: string | symbol, entityId: string): Loadable<TEntity, TError> {
  return getEntityState<TEntity, void, TError, void>(state, type).entities[entityId] || NotLoaded()
}

/**
 * Returns a list of entities with the given `type` and `entityIds`.
 * @param state The state of the application
 * @param type  The type of the entity
 * @param entityIds The id of the entities
 * @returns A list of `Loadable` entities
 */
export function getEntities<TEntity, TError = Error> (state: any, type: string | symbol, entityIds: string[]): Loadable<TEntity, TError>[] {
  return entityIds.map(id => {
    return getEntity(state, type, id)
  })
}

/**
 * Indicates whether or not the entity with the given `type` and `entityId` is
 * present.
 * @param state The state of the application
 * @param type The type of the entity
 * @param entityId The id of the entity
 * @returns Whether the entity is present
 */
export function hasEntity (state: any, type: string | symbol, entityId: string): boolean {
  return getEntity(state, type, entityId).match({
    Loaded (_entity) {
      return true
    },
    _ () {
      return false
    }
  })
}

/**
 * Returns the entity's page information with the given `type` and `pageId`.
 * @param state The state of the application
 * @param type The type of the entity
 * @param pageId The id of the page
 * @returns The page information
 */
export function getPageInformation<TEntity, TPage, TEntityError = Error, TPageError = Error> (state: any, type: string | symbol, pageId: string): Loadable<Page<TPage>, TPageError> {
  return getEntityState<TEntity, TPage, TEntityError, TPageError>(state, type).pages[pageId] || NotLoaded()
}

/**
 * Returns a list of entities of the given `type` that appear on the page by the
 * given `pageId`.
 * @param state The state of the application
 * @param type The type of the entity
 * @param pageId The id of the page
 * @returns A list of entities that belong to the page
 */
export function getPage<TEntity, TPage, TEntityError = Error, TPageError = Error> (state: any, type: string | symbol, pageId: string): Loadable<Loadable<TEntity, TEntityError>[], TPageError> {
  const page = getPageInformation<TEntity, TPage, TEntityError, TPageError>(state, type, pageId)

  return page.match({
    Loaded (page) {
      return Loaded(
        getEntities(state, type, page.ids)
      )
    },
    NotLoaded () {
      return NotLoaded()
    },
    Failed (e: TPageError) {
      return Failed(e)
    },
    Loading () {
      return Loading()
    }
  })
}
