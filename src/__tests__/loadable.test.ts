import { Loadable, NotLoaded, Loading, Loaded, Failed } from '../loadable'

const noop = () => { return }

describe('class Loadable', function () {
  describe('>>> match/1', function () {
    it('should match a `NotLoaded` case', function () {
      const loadable = NotLoaded()

      loadable.match({
        NotLoaded: noop,
        _ () { throw new Error('`NotLoaded` not matched') }
      })
    })

    it('should match a `Loading` case', function () {
      const loadable = Loading()

      loadable.match({
        Loading: noop,
        _ () { throw new Error('`Loading` not matched') }
      })
    })

    it('should match a `Loaded` case', function () {
      const loadable = Loaded('content')

      loadable.match({
        Loaded (content) {
          if (content !== 'content') {
            throw new Error('`content` does not equal "content"')
          }
        },
        _ () { throw new Error('`Loaded` not matched') }
      })
    })

    it('should match a `NotLoaded` case', function () {
      const error = new Error('`error` not the same as the expected one')
      const loadable = Failed(error)

      loadable.match({
        Failed (e) {
          if (e !== error) {
            throw error
          }
        },
        _ () { throw new Error('`NotLoaded` not matched') }
      })
    })

    it('should otherwise always match `_`', function () {
      const loadable = Loading()

      loadable.match({
        Failed (_e) { throw new Error('`_` not matched') },
        _: noop
      })
    })
  })
})

describe('NotLoaded/0', function () {
  it('should return an instance of `Loadable`', function () {
    expect(
      NotLoaded()
    ).toBeInstanceOf(Loadable)
  })

  it('should always return the same instance', function () {
    expect(
      NotLoaded()
    ).toBe(
      NotLoaded()
    )
  })
})

describe('Loading/0', function () {
  it('should return an instance of `Loadable`', function () {
    expect(
      Loading()
    ).toBeInstanceOf(Loadable)
  })

  it('should always return the same instance', function () {
    expect(
      Loading()
    ).toBe(
      Loading()
    )
  })
})

describe('Loaded/1', function () {
  it('should accept a content', function () {
    expect(
      Loaded('content')
    ).not.toBeNull()
  })
})

describe('Failed/1', function () {
  it('should accept an error', function () {
    expect(
      Failed(new Error('error'))
    ).not.toBeNull()
  })
})
