# Redux Odyssey
[![Build Status](https://travis-ci.org/brodeuralexis/redux-odyssey.svg?branch=master)](https://travis-ci.org/brodeuralexis/redux-odyssey)

# Installation

## _NPM_

```sh
npm install --save redux-odyssey
```

## _Yarn_
```
yarn add redux-odyssey
```

# Usage

Include the following in your call to `combineReducers/1`:

```js
import { reducers as odysseyReducers } from 'redux-odyssey'

const reducer = combineReducers({
  // snip
  ...odysseyReducers
})
```

You can then use the `Resource.createResource/1` function to create action creators
and selectors:

```ts
import { createEntityHelpers } from 'redux-odyssey'

export const User = Symbol('User')
export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string
}

export const {
  // Action creators
  setEntities: setUsers,
  setEntity: setUser,
  unsetEntities: unsetUsers,
  unsetEntity: unsetUser
  // Selectors
  getEntities: getUsers,
  getEntitiesSafe: getUsersSafe,
  getEntity: getUser,
  hasEntity: hasUser
} = Resource.createResource<User>(User)
```

The exported function will now allow one to manage resources.

# API

```ts
function createResource<T = {}> (type: string | symbol): {
  setEntities: (entities: { [id: string]: TEntity }): Action,
  setEntity: (id: string, entity: TEntity): Action,
  unsetEntities: (ids: string[]): Action,
  unsetEntity: (id: string): Action
  getEntities: (ids: string[]): TEntity[],
  getEntitiesSafe: (ids: string[]): TEntity[],
  getEntity: (id: string): TEntity | null,
  hasEntity: (id: string): boolean
}
```

The `createResource/1` function creates partially applied action creators and selectors to read and modify the resources stored in the state.

## Helpers

### Actions

```ts
function setResources (resources: { [id: string]: T }): Action
```

Adds or updates all the resources in the given object by their keys, which represents their `id`s.

---

```ts
function setResource (resourceId: string, resource: T): Action
```

Adds or updates the given resource according to its `id`.

---

```ts
function unsetResources (resourceIds: string[]): Action
```

Removes the resources with the given `id`s from the state.

---

```ts
function unsetResource (resourceId: string): Action
```

Removes the resource with the given `id`.

### Selectors

```ts
function getResources (resourceIds: string[]): T[]
```

Returns all the resources with the given `id`s.  If an resource does not exist, this function will throw an error.

---

```ts
function getResourcesSafe(resourceIds: string[]): T[]
```

Returns all the resources with the given `id`s.  If a resource does not exist, it will be excluded from the resulting array.

---

```ts
function getResource (resourceId: string): T | null
```

Returns a resource by its `id`.  If the resource does not exist, `null` is returned.

---

```ts
function hasResource (id: string): boolean
```

Indicates if the resource with the given `id` exists.
