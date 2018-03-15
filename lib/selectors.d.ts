import { State, Type } from './state';
/**
 * Returns the entity with the given `type` and `id`.  If the entity does not
 * exist, return `null`.
 * @param state The state
 * @param type The type of the entity
 * @param id The id of the entity
 * @returns An entity or `null`
 */
export declare function getEntity(state: State, type: Type, id: string): object | null;
/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, an error is throw.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export declare function getEntities(state: State, type: Type, ids: string[]): object[];
/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, it is ignored in the resulting array.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
export declare function getEntitiesSafe(state: State, type: Type, ids: string[]): object[];
/**
 * Indicates if an entity is present in the state by it's given `id`.
 * @param state The state
 * @param type The type of entity
 * @param id The `id` of the entity
 * @returns The entity's presence
 */
export declare function hasEntity(state: State, type: Type, id: string): boolean;
