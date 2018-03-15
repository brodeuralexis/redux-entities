# Installation

## _NPM_

```sh
npm install --save brodeuralexis/redux-entities#1.0.0
```

## _Yarn_
```
yarn add brodeuralexis/redux-entities#1.0.0
```

# Usage

Include the following in your call to `combineReducers/1`:

```js
import { entities } from 'redux-entities'

const reducer = combineReducers({
  // snip
  ...entities
})
```

Your can then use the `createEntityHelpers/1` function to create action creators
and selectors:

```ts
import { createEntityHelpers } from 'redux-entities'

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string
}

export const {
  actions: {
    setEntities: setUsers,
    setEntity: setUser,
    unsetEntities: unsetUsers,
    unsetEntity: unsetUser
  },
  selectors: {
    getEntities: getUsers,
    getEntitiesSafe: getUsersSafe,
    getEntity: getUser,
    hasEntity: hasUser
  }
} = createEntityHelpers<User>('user')
```

The exported function will now allow one to manage user entities.

# API

```ts
function createEntityHelpers<TEntity extends {}> (type: string): {
  actions: {
    setEntities: (entities: { [id: string]: TEntity }): Action,
    setEntity: (id: string, entity: TEntity): Action,
    unsetEntities: (ids: string[]): Action,
    unsetEntity: (id: string): Action
  },
  selectors: {
    getEntities: (ids: string[]): TEntity[],
    getEntitiesSafe: (ids: string[]): TEntity[],
    getEntity: (id: string): TEntity | null,
    hasEntity: (id: string): boolean
  }
}
```

The `createEntityHelpers/1` function creates partially applied action creators and selectors to read and modify the entities stored in the state.

## Helpers

### Actions

```ts
function setEntities (entities: { [id: string]: TEntity }): Action
```

Adds or updates all the entities in the given object by their keys, which represents their `id`s.

---

```ts
function setEntity (id: string, entity: TEntity): Action
```

Adds or updates the given entity according to its `id`.

---

```ts
function unsetEntities (ids: string[]): Action
```

Removes the entities with the given `id`s from the state.

---

```ts
function unsetEntity (id: string): Action
```

Remove sthe entity with the given `id`.

### Selectors

```ts
function getEntities (ids: string[]): TEntity[]
```

Returns all the entities with the given `id`s.  If an entity does not exist, this function will throw an error.

---

```ts
function getEntitiesSafe(ids: string[]): TEntity[]
```

Returns all the entities with the given `id`s.  If an entity does not exist, it will be excluded from the resulting array.

---

```ts
function getEntity (id: string): TEntity | null
```

Returns an entity by its `id`.  If the entity does not exist, `null` is returned.

---

```ts
function hasEntity (id: string): boolean
```

Indicates if the entity with the given `id` exists.