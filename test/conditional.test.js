const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('conditional', () => {
  test('returns _then if first argument is ROBDD.True', () => {
    const _then = robdd.and(robdd.variable(), robdd.variable())
    const _else = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.conditional(robdd.True, _then, _else)).toBe(_then)
  })

  test('returns _else if first argument is ROBDD.False', () => {
    const _then = robdd.and(robdd.variable(), robdd.variable())
    const _else = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.conditional(robdd.False, _then, _else)).toBe(_else)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x     = robdd.variable()
    const _then = robdd.and(robdd.variable(), robdd.variable())
    const _else = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.conditional(x, _then, _else)._then).toBe(_then)
    expect(robdd.conditional(x, _then, _else)._else).toBe(_else)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x     = robdd.variable()
    const _then = robdd.True
    const _else = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.conditional(x, _then, _else)._then).toBe(_then)
    expect(robdd.conditional(x, _then, _else)._else).toBe(_else)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x     = robdd.variable()
    const _then = robdd.and(robdd.variable(), robdd.variable())
    const _else = robdd.False

    expect(robdd.conditional(x, _then, _else)._then).toBe(_then)
    expect(robdd.conditional(x, _then, _else)._else).toBe(_else)
  })
})
