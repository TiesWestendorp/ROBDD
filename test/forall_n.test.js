const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('forallN', () => {
  test('returns ROBDD.True if argument is ROBDD.True', () => {
    expect(robdd.forallN(robdd.True, [])).toBe(robdd.True)
  })

  test('returns ROBDD.False if argument is ROBDD.False', () => {
    expect(robdd.forallN(robdd.False, [])).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.or(x, y)
    expect(robdd.forallN(bdd, [x._label])).toBe(y)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.and(x, y)
    expect(robdd.forallN(bdd, [x._label])).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const z   = robdd.variable()
    const bdd = robdd.and(robdd.and(x, y), z)
    expect(robdd.forallN(bdd, [x._label])).toBe(robdd.False)
  })
})
