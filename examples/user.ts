import { createEntity, Loadable, SetPagesAction, UnsetPagesAction, SetEntitiesAction, UnsetEntitiesAction, Page } from '../src/index'

export const User = Symbol('User')
export interface User {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  createdAt: Date,
  updatedAt: Date
}

export type UserEntityError
  = 'NotFound'
  | 'Other'

export type UserPageError
  = 'NotFound'
  | 'BadArguments'
  | 'Other'

export const UserEntity = createEntity<User, { n: number }, UserEntityError, UserPageError>(User)

UserEntity.setEntityLoaded('1', {
  id: '1',
  email: 'brodeuralexis@gmail.com',
  firstName: 'Alexis',
  lastName: 'Brodeur',
  createdAt: new Date(),
  updatedAt: new Date()
})
