export abstract class Loadable<T, E = Error> {
  public abstract match<U> (patterns: LoadablePatterns<T, E, U>): U
}

export type $Patterns<T, E, U> = {
  NotLoaded (): U,
  Loading (): U,
  Loaded (data: T): U,
  Failed (error: E): U
}

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

export function Failed<T> (error: Error): Loadable<T> {
  return new $Failed(error)
}
