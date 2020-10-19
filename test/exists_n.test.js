const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('existsN', () => {
  test('returns ROBDD.True if argument is ROBDD.True', () => {
    expect(robdd.existsN(robdd.True, [])).toBe(robdd.True)
  })

  test('returns ROBDD.False if argument is ROBDD.False', () => {
    expect(robdd.existsN(robdd.False, [])).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.or(x, y)
    expect(robdd.existsN(bdd, [x._label])).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.and(x, y)
    expect(robdd.existsN(bdd, [x._label])).toBe(y)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const z   = robdd.variable()
    const bdd = robdd.and(robdd.and(x, y), z)
    expect(robdd.existsN(bdd, [x._label])).toBe(robdd.and(y, z))
  })
})
