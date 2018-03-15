import { State, Type } from './state';
/**
 * Creates selectors partially applied for a given type.
 * @param type A unique key representing the type of entities
 */
export declare function createSelectors<TEntity extends object>(type: Type): {
    getEntity(state: State, id: string): TEntity | null;
    getEntities(state: State, ids: string[]): TEntity[];
    getEntitiesSafe(state: State, ids: string[]): TEntity[];
    hasEntity(state: State, id: string): boolean;
};
