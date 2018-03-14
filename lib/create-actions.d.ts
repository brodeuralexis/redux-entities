import { TypedEntities } from './state';
import { SetEntitiesAction, UnsetEntitiesAction } from './actions';
/**
 * Creates action creators for the given entity type.
 * @param type The type of the entity
 */
export declare function createActions<TType extends object>(type: string): {
    setEntity(id: string, entity: TType): SetEntitiesAction;
    setEntities(entities: TypedEntities<TType>): SetEntitiesAction;
    unsetEntity(id: string): UnsetEntitiesAction;
    unsetEntities(ids: string[]): UnsetEntitiesAction;
};
