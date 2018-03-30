import { Loadable, NotLoaded, Loading, Loaded, Failed } from './loadable'

import { setEntities, setEntity, unsetEntities, unsetEntity, setPages, setPage, unsetPages, unsetPage, SetEntitiesAction, UnsetEntitiesAction, SetPagesAction, UnsetPagesAction } from './module/actions'
import { getEntities, getEntity, getPage, getPageInformation, hasEntity } from './module/selectors'
import { Page } from './module/state'

export function createEntity<TEntity, TPage, TEntityError, TPageError> (type: string | symbol) {
  return new class {
    setEntities = (entities: { [entityId: string]: Loadable<TEntity, TEntityError> }) => {
      return setEntities(type, entities)
    }
    setEntity = (entityId: string, entity: Loadable<TEntity, TEntityError>) => {
      return setEntity(type, entityId, entity)
    }
    setEntityNotLoaded = (entityId: string) => {
      return this.setEntity(entityId, NotLoaded())
    }
    setEntityLoading = (entityId: string) => {
      return this.setEntity(entityId, Loading())
    }
    setEntityLoaded = (entityId: string, entity: TEntity) => {
      return this.setEntity(entityId, Loaded(entity))
    }
    setEntityFailed = (entityId: string, error: TEntityError) => {
      return this.setEntity(entityId, Failed(error))
    }
    unsetEntities = (entityIds: string[]) => {
      return unsetEntities(type, entityIds)
    }
    unsetEntity = (entityId: string) => {
      return unsetEntity(type, entityId)
    }
    setPages = (pages: { [pageId: string]: Loadable<Page<TPage>, TPageError> }) => {
      return setPages(type, pages)
    }
    setPage = (pageId: string, page: Loadable<Page<TPage>, TPageError>) => {
      return setPage(type, pageId, page)
    }
    setPageNotLoaded = (pageId: string) => {
      return this.setPage(pageId, NotLoaded())
    }
    setPageLoading = (pageId: string) => {
      return this.setPage(pageId, Loading())
    }
    setPageLoaded = (pageId: string, page: Page<TPage>) => {
      return this.setPage(pageId, Loaded(page))
    }
    setPageFailed = (pageId: string, error: TPageError) => {
      return this.setPage(pageId, Failed(error))
    }
    unsetPages = (pageIds: string[]) => {
      return unsetPages(type, pageIds)
    }
    unsetPage = (pageId: string) => {
      return unsetPage(type, pageId)
    }
    getEntities = (state: any, entityIds: string[]) => {
      return getEntities<TEntity, TEntityError>(state, type, entityIds)
    }
    getEntity = (state: any, entityId: string) => {
      return getEntity<TEntity, TEntityError>(state, type, entityId)
    }
    hasEntity = (state: any, entityId: string) => {
      return hasEntity(state, type, entityId)
    }
    getPageInformation = (state: any, pageId: string) => {
      return getPageInformation<TPage, TPageError>(state, type, pageId)
    }
    getPage = (state: any, pageId: string) => {
      return getPage<TEntity, TPage, TEntityError, TPageError>(state, type, pageId)
    }
  }()
}
