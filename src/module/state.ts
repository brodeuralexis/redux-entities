import { Loadable } from '../loadable'

export const ODYSSEY_KEY = Symbol('odyssey')

export interface $State {
  [ODYSSEY_KEY]: OdysseyState
}

export interface OdysseyState {
  [type: string]: EntityState<any, any, any, any> | undefined
}

export const initialOdysseyState = {}

export interface EntityState<TEntity, TPage, TEntityError = Error, TPageError = Error> {
  entities: EntityEntitiesState<TEntity, TEntityError>,
  pages: EntityPagesState<TPage, TPageError>
}

export const initialEntityState: EntityState<any, any, any, any> = {
  entities: {},
  pages: {}
}

export interface EntityEntitiesState<TEntity, TError = Error> {
  [entityId: string]: Loadable<TEntity, TError> | undefined
}

export interface EntityPagesState<TPage, TError = Error> {
  [pageId: string]: Loadable<Page<TPage>, TError> | undefined
}

export interface Page<TPage> {
  ids: string[],
  original: TPage,
  next: string | null,
  previous: string | null
}
