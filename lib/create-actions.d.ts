import { TypedEntities, Type } from './state';
import { SetEntitiesAction, UnsetEntitiesAction } from './actions';
/**
 * Creates action creators for the given entity type.
 * @param type The type of the entity
 */
export declare function createActions<TEntity extends object>(type: Type): {
    setEntity(id: string, entity: TEntity): SetEntitiesAction;
    setEntities(entities: TypedEntities<TEntity>): SetEntitiesAction;
    unsetEntity(id: string): UnsetEntitiesAction;
    unsetEntities(ids: string[]): UnsetEntitiesAction;
};
