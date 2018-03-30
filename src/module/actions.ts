import { Loadable } from '../loadable'
import { Page } from './state'

export type OdysseyAction<TEntity, TPage, TEntityError = Error, TPageError = Error>
  = SetEntitiesAction<TEntity, TEntityError>
  | UnsetEntitiesAction<TEntity, TEntityError>
  | SetPagesAction<TPage, TPageError>
  | UnsetPagesAction<TPage, TPageError>

// #region Aliases
export function setEntity<TEntity, TError = Error> (type: string | symbol, entityId: string, entity: Loadable<TEntity, TError>): SetEntitiesAction<TEntity, TError> {
  return setEntities(type, {
    [entityId]: entity
  })
}

export function unsetEntity<TEntity, TError = Error> (type: string | symbol, entityId: string): UnsetEntitiesAction<TEntity, TError> {
  return unsetEntities(type, [entityId])
}

export function setPage<TPage, TError = Error> (type: string | symbol, pageId: string, page: Loadable<Page<TPage>, TError>): SetPagesAction<TPage, TError> {
  return setPages(type, {
    [pageId]: page
  })
}

export function unsetPage<TPage, TError = Error> (type: string | symbol, pageId: string): UnsetPagesAction<TPage, TError> {
  return unsetPages(type, [pageId])
}
// #endregion

// #region SET_ENTITIES
export const SET_ENTITIES = Symbol('SET_ENTITIES')

export interface SetEntitiesAction<TEntity, TError = Error> {
  type: typeof SET_ENTITIES,
  payload: {
    type: string | symbol,
    entities: {
      [entityId: string]: Loadable<TEntity, TError>
    }
  }
}

export function setEntities<TEntity, TError> (type: string | symbol, entities: { [entityId: string]: Loadable<TEntity, TError> }): SetEntitiesAction<TEntity, TError> {
  return {
    type: SET_ENTITIES,
    payload: {
      type,
      entities
    }
  }
}
// #endregion

// #region UNSET_ENTITIES
export const UNSET_ENTITIES = Symbol('UNSET_ENTITIES')

export interface UnsetEntitiesAction<TEntity, TError = Error> {
  type: typeof UNSET_ENTITIES,
  payload: {
    type: string | symbol,
    entityIds: string[]
  }
}

export function unsetEntities<TEntity, TError = Error> (type: string | symbol, entityIds: string[]): UnsetEntitiesAction<TEntity, TError> {
  return {
    type: UNSET_ENTITIES,
    payload: {
      type,
      entityIds
    }
  }
}
// #endregion

// #region SET_PAGE
export const SET_PAGES = Symbol('SET_PAGES')

export interface SetPagesAction<TPage, TError = Error> {
  type: typeof SET_PAGES,
  payload: {
    type: string | symbol,
    pages: {
      [pageId: string]: Loadable<Page<TPage>, TError>
    }
  }
}

export function setPages<TPage, TError> (type: string | symbol, pages: { [pageId: string]: Loadable<Page<TPage>, TError> }): SetPagesAction<TPage, TError> {
  return {
    type: SET_PAGES,
    payload: {
      type,
      pages
    }
  }
}
// #endregion

// #region UNSET_PAGES
export const UNSET_PAGES = Symbol('UNSET_PAGES')

export interface UnsetPagesAction<TPage, TError = Error> {
  type: typeof UNSET_PAGES,
  payload: {
    type: string | symbol,
    pageIds: string[]
  }
}

export function unsetPages<TPage, TError = Error> (type: string | symbol, pageIds: string[]): UnsetPagesAction<TPage, TError> {
  return {
    type: UNSET_PAGES,
    payload: {
      type,
      pageIds
    }
  }
}
// #endregion
