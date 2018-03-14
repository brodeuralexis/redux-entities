import { Action } from 'redux';
import { Entities } from './state';
/**
 * The type of the `SetEntitiesAction`.
 */
export declare const SET_ENTITIES: unique symbol;
/**
 * An action indicating the fact that the user wants to add entities to the
 * state.
 */
export interface SetEntitiesAction extends Action {
    type: typeof SET_ENTITIES;
    payload: {
        type: string;
        entities: Entities;
    };
}
/**
 * Instructs the reducer the add the following entities of the given type to the
 * state.
 * @param type The type of the entities
 * @param entities The entities
 * @returns An `SetEntitiesAction`
 */
export declare function setEntities(type: string, entities: Entities): SetEntitiesAction;
/**
 * The type of the `UnsetEntitiesAction`.
 */
export declare const UNSET_ENTITIES: unique symbol;
/**
 * An action indicating the fact that the user wants to remove entities from the
 * state by their `id`s.
 */
export interface UnsetEntitiesAction extends Action {
    type: typeof UNSET_ENTITIES;
    payload: {
        type: string;
        ids: string[];
    };
}
/**
 * Removes all the entities with the given `id`s for the given `type`.
 * @param type The type of the entities
 * @param ids The `id`s of the entities
 * @returns An `UnsetEntitiesAction`
 */
export declare function unsetEntities(type: string, ids: string[]): UnsetEntitiesAction;
/**
 * Indicates that the user wants to add a given entity to the state.
 * @param type The type
 * @param id  The `id`
 * @param entity The entity
 * @returns A `SetEntitiesAction`
 */
export declare function setEntity(type: string, id: string, entity: object): SetEntitiesAction;
/**
 * Indicates that the user wants to remove an entity by it's given `id`.
 * @param type The type
 * @param id The `id`
 * @returns An `UnsetEntitiesAction`
 */
export declare function unsetEntity(type: string, id: string): UnsetEntitiesAction;
export declare type EntitiesAction = SetEntitiesAction | UnsetEntitiesAction;
