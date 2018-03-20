import { Action, SetEntitiesAction, UnsetEntitiesAction } from './actions';
import { Type } from './state';
/**
 * Creates action matchers for a specific entity.
 * @param type The type of the entity
 */
export declare function createActionMatchers<TEntity extends object>(type: Type): {
    isSetEntities: (action: Action) => action is SetEntitiesAction;
    isUnsetEntities: (action: Action) => action is UnsetEntitiesAction;
    isSetEntity: (id: string) => (action: Action) => boolean;
    isUnsetEntity: (id: string) => (action: Action) => boolean;
};
