import * as _Resources from './resources/index'
export const Resources = _Resources

export * from './loadable'

export const reducers = {
  ...Resources.resources
}
