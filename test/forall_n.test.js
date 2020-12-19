const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('forallN', () => {
  test('returns ROBDD.True if argument is ROBDD.True', () => {
    expect(ROBDD.forallN(ROBDD.True, [])).toBe(ROBDD.True)
  })

  test('returns ROBDD.False if argument is ROBDD.False', () => {
    expect(ROBDD.forallN(ROBDD.False, [])).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const bdd = ROBDD.or(x, y)
    expect(ROBDD.forallN(bdd, [x._label])).toBe(y)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const bdd = ROBDD.and(x, y)
    expect(ROBDD.forallN(bdd, [x._label])).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const z   = ROBDD.variable()
    const bdd = ROBDD.and(ROBDD.and(x, y), z)
    expect(ROBDD.forallN(bdd, [x._label])).toBe(ROBDD.False)
  })
})
