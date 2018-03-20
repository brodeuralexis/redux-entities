(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ReduxOdyssey = {})));
}(this, (function (exports) { 'use strict';

/**
 * The key to use for this module.
 */
const entitiesKey = Symbol('entities');
/**
 * Associates a given key with a given `id` for each provided entities.  If the
 * `id` already has an entry, it overrides the previous value.
 * @param state The state
 * @param type The type of the entities
 * @param entities The entities
 */
function setEntities(state, type, entities) {
    const oldEntities = state[type] || {};
    return Object.assign({}, state, { [type]: Object.assign({}, oldEntities, entities) });
}
/**
 * Removes the given `id`s from the map of entities.  If the entity with one of
 * the given `id` does not exist, do nothing.
 * @param state The state
 * @param type The type of the entities
 * @param ids The `id`s
 */
function unsetEntities(state, type, ids) {
    const oldEntities = state[type];
    if (oldEntities == null) {
        return state;
    }
    const newEntities = Object.assign({}, oldEntities);
    for (const id of ids) {
        delete newEntities[id];
    }
    return Object.assign({}, state, { [type]: newEntities });
}

// #region SET_ENTITIES
/**
 * The type of the `SetEntitiesAction`.
 */
const SET_ENTITIES = Symbol('@@redux-entities/SET_ENTITY');
/**
 * Instructs the reducer the add the following entities of the given type to the
 * state.
 * @param type The type of the entities
 * @param entities The entities
 * @returns An `SetEntitiesAction`
 */
function setEntities$1(type, entities) {
    return {
        type: SET_ENTITIES,
        payload: {
            type,
            entities
        }
    };
}
// #endregion
// #region UNSET_ENTITIES
/**
 * The type of the `UnsetEntitiesAction`.
 */
const UNSET_ENTITIES = Symbol('@@redux-entities/UNSET_ENTITIES');
/**
 * Removes all the entities with the given `id`s for the given `type`.
 * @param type The type of the entities
 * @param ids The `id`s of the entities
 * @returns An `UnsetEntitiesAction`
 */
function unsetEntities$1(type, ids) {
    return {
        type: UNSET_ENTITIES,
        payload: {
            type,
            ids
        }
    };
}
// #endregion
// #region Aliases
/**
 * Indicates that the user wants to add a given entity to the state.
 * @param type The type
 * @param id  The `id`
 * @param entity The entity
 * @returns A `SetEntitiesAction`
 */
function setEntity(type, id, entity) {
    return setEntities$1(type, { [id]: entity });
}
/**
 * Indicates that the user wants to remove an entity by it's given `id`.
 * @param type The type
 * @param id The `id`
 * @returns An `UnsetEntitiesAction`
 */
function unsetEntity(type, id) {
    return unsetEntities$1(type, [id]);
}

/**
 * The reducer for the entities.
 * @param state The state
 * @param action An action
 * @returns The new value of the state
 */
function entitiesReducer(state, action) {
    switch (action.type) {
        case SET_ENTITIES: {
            return setEntities(state, action.payload.type, action.payload.entities);
        }
        case UNSET_ENTITIES: {
            return unsetEntities(state, action.payload.type, action.payload.ids);
        }
        default: {
            return state;
        }
    }
}

/**
 * Creates action creators for the given entity type.
 * @param type The type of the entity
 */
function createActions(type) {
    return {
        setEntity(id, entity) {
            return setEntity(type, id, entity);
        },
        setEntities(entities) {
            return setEntities$1(type, entities);
        },
        unsetEntity(id) {
            return unsetEntity(type, id);
        },
        unsetEntities(ids) {
            return unsetEntities$1(type, ids);
        }
    };
}

/**
 * Creates action matchers for a specific entity.
 * @param type The type of the entity
 */
function createActionMatchers(type) {
    function _isSetEntities(action) {
        return action.type === SET_ENTITIES;
    }
    function _isUnsetEntities(action) {
        return action.type === UNSET_ENTITIES;
    }
    function isSetEntities(action) {
        return _isSetEntities(action) && action.payload.type === type;
    }
    function isUnsetEntities(action) {
        return _isUnsetEntities(action) && action.payload.type === type;
    }
    function isSetEntity(id) {
        return function (action) {
            return isSetEntities(action) && id in action.payload.entities;
        };
    }
    function isUnsetEntity(id) {
        return function (action) {
            return isUnsetEntities(action) && action.payload.ids.indexOf(id) !== -1;
        };
    }
    return {
        isSetEntities,
        isUnsetEntities,
        isSetEntity,
        isUnsetEntity
    };
}

/**
 * Returns the entity with the given `type` and `id`.  If the entity does not
 * exist, return `null`.
 * @param state The state
 * @param type The type of the entity
 * @param id The id of the entity
 * @returns An entity or `null`
 */
function getEntity(state, type, id) {
    const entities = state[entitiesKey][type];
    if (!entities) {
        return null;
    }
    return entities[id] || null;
}
/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, an error is throw.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
function getEntities(state, type, ids) {
    if (!hasType(state, type)) {
        throw new Error(`Expected the "${type}" type to exist`);
    }
    return ids.map(function (id) {
        const entity = getEntity(state, type, id);
        if (entity == null) {
            throw new Error(`Expected the "${type}" with identified by "${id}" to exist`);
        }
        return entity;
    });
}
/**
 * Returns a list of entities for all `id` supplied in the `ids` array.  If the
 * `id` does not point to a valid entity, it is ignored in the resulting array.
 * @param state The state
 * @param type The type of the entities
 * @param ids An array of entity id
 * @returns An array of entities
 */
function getEntitiesSafe(state, type, ids) {
    return ids.reduce(function (entities, id) {
        const entity = getEntity(state, type, id);
        if (entity) {
            entities.push(entity);
        }
        return entities;
    }, []);
}
/**
 * Indicates if an entity is present in the state by it's given `id`.
 * @param state The state
 * @param type The type of entity
 * @param id The `id` of the entity
 * @returns The entity's presence
 */
function hasEntity(state, type, id) {
    return getEntity(state, type, id) != null;
}
function hasType(state, type) {
    return state[entitiesKey][type] != null;
}

/**
 * Creates selectors partially applied for a given type.
 * @param type A unique key representing the type of entities
 */
function createSelectors(type) {
    return {
        getEntity(state, id) {
            return getEntity(state, type, id);
        },
        getEntities(state, ids) {
            return getEntities(state, type, ids);
        },
        getEntitiesSafe(state, ids) {
            return getEntitiesSafe(state, type, ids);
        },
        hasEntity(state, id) {
            return hasEntity(state, type, id);
        }
    };
}

function createEntityHelpers(type) {
    return {
        matchers: createActionMatchers(type),
        actions: createActions(type),
        selectors: createSelectors(type)
    };
}
const entities = {
    [entitiesKey]: entitiesReducer
};

exports.createEntityHelpers = createEntityHelpers;
exports.entities = entities;
exports.createActions = createActions;
exports.createActionMatchers = createActionMatchers;
exports.createSelectors = createSelectors;
exports.entitiesReducer = entitiesReducer;
exports.entitiesKey = entitiesKey;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
