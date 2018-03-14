import { Action } from 'redux';
import { SetEntitiesAction, UnsetEntitiesAction } from './actions';
import { entitiesKey } from './state';
import { entitiesReducer } from './reducer';
export declare function createEntityHelpers<TType extends object>(type: string): {
    matchers: {
        isSetEntities: (action: Action) => action is SetEntitiesAction;
        isUnsetEntities: (action: Action) => action is UnsetEntitiesAction;
        isSetEntity: (id: string) => (action: Action) => boolean;
        isUnsetEntity: (id: string) => (action: Action) => boolean;
    };
    actions: {
        setEntity(id: string, entity: TType): SetEntitiesAction;
        setEntities(entities: {
            [id: string]: TType;
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
        }, id: string): TType | null;
        getEntities(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, ids: string[]): TType[];
        getEntitiesSafe(state: {
            [entitiesKey]: {
                [type: string]: {
                    [id: string]: object;
                };
            };
        }, ids: string[]): TType[];
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
