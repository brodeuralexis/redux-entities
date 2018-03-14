import { Action } from 'redux';
import { SetEntitiesAction, UnsetEntitiesAction } from './actions';
/**
 * Creates action matchers for a specific entity.
 * @param type The type of the entity
 */
export declare function createActionMatchers<TType extends object>(type: string): {
    isSetEntities: (action: Action) => action is SetEntitiesAction;
    isUnsetEntities: (action: Action) => action is UnsetEntitiesAction;
    isSetEntity: (id: string) => (action: Action) => boolean;
    isUnsetEntity: (id: string) => (action: Action) => boolean;
};
