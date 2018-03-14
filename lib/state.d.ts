/**
 * The key to use for this module.
 */
export declare const entitiesKey: unique symbol;
/**
 * The part of the state this module knows about.
 */
export declare type State = {
    [entitiesKey]: EntitiesState;
};
/**
 * The structure of the state associated with the reducer.
 */
export declare type EntitiesState = {
    [type: string]: Entities;
};
/**
 * The map of entities.
 */
export declare type Entities = {
    [id: string]: object;
};
/**
 * A map of typed entities.
 */
export declare type TypedEntities<TType> = {
    [id: string]: TType;
};
/**
 * The initial value of the state.
 */
export declare const initialState: EntitiesState;
/**
 * Associates a given key with a given `id` for each provided entities.  If the
 * `id` already has an entry, it overrides the previous value.
 * @param state The state
 * @param type The type of the entities
 * @param entities The entities
 */
export declare function setEntities(state: EntitiesState, type: string, entities: Entities): EntitiesState;
/**
 * Removes the given `id`s from the map of entities.  If the entity with one of
 * the given `id` does not exist, do nothing.
 * @param state The state
 * @param type The type of the entities
 * @param ids The `id`s
 */
export declare function unsetEntities(state: EntitiesState, type: string, ids: string[]): EntitiesState;
