export abstract class Loadable<T> {
  public abstract match<U> (patterns: LoadablePatterns<T, U>): U
}

export type $Patterns<T, U> = {
  NotLoaded (): U,
  Loading (): U,
  Loaded (data: T): U,
  Failed (error: Error): U
}

export type LoadablePatterns<T, U> = $Patterns<T, U> | ({ _ (): U } & Partial<$Patterns<T, U>>)

const $NotLoaded = new class extends Loadable<any> {
  public match<U> (patterns: LoadablePatterns<any, U>): U {
    if ('NotLoaded' in patterns) {
      return patterns.NotLoaded!()
    } else {
      return patterns._()
    }
  }
}()

export function NotLoaded<T> (): Loadable<T> {
  return $NotLoaded
}

const $Loading = new class extends Loadable<any> {
  public match<U> (patterns: LoadablePatterns<any, U>): U {
    if ('Loading' in patterns) {
      return patterns.Loading!()
    } else {
      return patterns._()
    }
  }
}()

export function Loading<T> (): Loadable<T> {
  return $Loading
}

class $Loaded<T> extends Loadable<T> {
  public constructor (
    private readonly content: T
  ) {
    super()
  }

  public match<U> (patterns: LoadablePatterns<T, U>): U {
    if ('Loaded' in patterns) {
      return patterns.Loaded!(this.content)
    } else {
      return patterns._()
    }
  }
}

export function Loaded<T> (content: T): Loadable<T> {
  return new $Loaded(content)
}

class $Failed<T> extends Loadable<T> {
  public constructor (
    private readonly error: Error
  ) {
    super()
  }

  public match<U> (patterns: LoadablePatterns<T, U>): U {
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
