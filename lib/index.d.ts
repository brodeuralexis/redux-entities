import { Action } from 'redux';
import { SetEntitiesAction, UnsetEntitiesAction } from './actions';
import { entitiesKey } from './state';
import { entitiesReducer } from './reducer';
export declare function createEntityHelpers<TEntity extends object>(type: string | symbol): {
    matchers: {
        isSetEntities: (action: Action) => action is SetEntitiesAction;
        isUnsetEntities: (action: Action) => action is UnsetEntitiesAction;
        isSetEntity: (id: string) => (action: Action) => boolean;
        isUnsetEntity: (id: string) => (action: Action) => boolean;
    };
    actions: {
        setEntity(id: string, entity: TEntity): SetEntitiesAction;
        setEntities(entities: {
            [id: string]: TEntity;
        }): SetEntitiesAction;
        unsetEntity(id: string): UnsetEntitiesAction;
        unsetEntities(ids: string[]): UnsetEntitiesAction;
    };
    selectors: {
        getEntity(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, id: string): TEntity | null;
        getEntities(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, ids: string[]): TEntity[];
        getEntitiesSafe(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, ids: string[]): TEntity[];
        hasEntity(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, id: string): boolean;
    };
};
export { createActions } from './create-actions';
export { createActionMatchers } from './create-action-matchers';
export { createSelectors } from './create-selectors';
export declare const entities: {
    [entitiesKey]: typeof entitiesReducer;
};
export { entitiesReducer } from './reducer';
export { entitiesKey } from './state';
