/**
 * The type of anything that is loadable in the application.
 * @param T The type of the content to load
 * @param E The type of errors this `Loadable` may contain
 */
export abstract class Loadable<T, E = Error> {
  public abstract match<U> (patterns: LoadablePatterns<T, E, U>): U
}

export type $Patterns<T, E, U> = {
  NotLoaded (): U,
  Loading (): U,
  Loaded (data: T): U,
  Failed (error: E): U
}

/**
 * The shape of the patterns given to the `match` function of the
 * `Loadable` instance.
 */
export type LoadablePatterns<T, E, U> = $Patterns<T, E, U> | ({ _ (): U } & Partial<$Patterns<T, E, U>>)

const $NotLoaded = new class extends Loadable<any, any> {
  public match<U> (patterns: LoadablePatterns<any, any, U>): U {
    if ('NotLoaded' in patterns) {
      return patterns.NotLoaded!()
    } else {
      return patterns._()
    }
  }
}()

/**
 * Returns an instance of `Loadable` representing data that has not been loaded.
 * @returns A `Loadable` instance
 */
export function NotLoaded<T, E> (): Loadable<T, E> {
  return $NotLoaded
}

const $Loading = new class extends Loadable<any, any> {
  public match<U> (patterns: LoadablePatterns<any, any, U>): U {
    if ('Loading' in patterns) {
      return patterns.Loading!()
    } else {
      return patterns._()
    }
  }
}()

/**
 * Returns an instance of `Loadable` representing data that is being loaded.
 * @returns A `Loadable` instance
 */
export function Loading<T, E = Error> (): Loadable<T, E> {
  return $Loading
}

class $Loaded<T, E = Error> extends Loadable<T, E> {
  public constructor (
    private readonly content: T
  ) {
    super()
  }

  public match<U> (patterns: LoadablePatterns<T, E, U>): U {
    if ('Loaded' in patterns) {
      return patterns.Loaded!(this.content)
    } else {
      return patterns._()
    }
  }
}

/**
 * Returns an instance of `Loadable` representing loaded content.
 * @param content The content of the `Loadable`
 * @returns A `Loadable` instance
 */
export function Loaded<T, E = Error> (content: T): Loadable<T, E> {
  return new $Loaded(content)
}

class $Failed<T, E = Error> extends Loadable<T, E> {
  public constructor (
    private readonly error: E
  ) {
    super()
  }

  public match<U> (patterns: LoadablePatterns<T, E, U>): U {
    if ('Failed' in patterns) {
      return patterns.Failed!(this.error)
    } else {
      return patterns._()
    }
  }
}

/**
 * Returns an instance of `Loadable` representing an error loading the content.
 * @param error The error
 * @returns A `Loadable` instance
 */
export function Failed<T, E = Error> (error: E): Loadable<T, E> {
  return new $Failed(error)
}
