const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('conditional', () => {
  test('returns _then if first argument is ROBDD.True', () => {
    const _then = ROBDD.and(ROBDD.variable(), ROBDD.variable())
    const _else = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.conditional(ROBDD.True, _then, _else)).toBe(_then)
  })

  test('returns _else if first argument is ROBDD.False', () => {
    const _then = ROBDD.and(ROBDD.variable(), ROBDD.variable())
    const _else = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.conditional(ROBDD.False, _then, _else)).toBe(_else)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x     = ROBDD.variable()
    const _then = ROBDD.and(ROBDD.variable(), ROBDD.variable())
    const _else = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.conditional(x, _then, _else)._then).toBe(_then)
    expect(ROBDD.conditional(x, _then, _else)._else).toBe(_else)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x     = ROBDD.variable()
    const _then = ROBDD.True
    const _else = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.conditional(x, _then, _else)._then).toBe(_then)
    expect(ROBDD.conditional(x, _then, _else)._else).toBe(_else)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x     = ROBDD.variable()
    const _then = ROBDD.and(ROBDD.variable(), ROBDD.variable())
    const _else = ROBDD.False

    expect(ROBDD.conditional(x, _then, _else)._then).toBe(_then)
    expect(ROBDD.conditional(x, _then, _else)._else).toBe(_else)
  })
})
