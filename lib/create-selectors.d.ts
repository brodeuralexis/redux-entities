import { State } from './state';
/**
 * Creates selectors partially applied for a given type.
 * @param type A unique key representing the type of entities
 */
export declare function createSelectors<TType extends object>(type: string): {
    getEntity(state: State, id: string): TType | null;
    getEntities(state: State, ids: string[]): TType[];
    getEntitiesSafe(state: State, ids: string[]): TType[];
    hasEntity(state: State, id: string): boolean;
};
