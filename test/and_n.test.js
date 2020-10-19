const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('andN', () => {
  test('returns ROBDD.True if argument is []', () => {
    expect(robdd.andN([])).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = robdd.variable()
    const bdd = robdd.andN([x])

    expect(bdd).toBe(x)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.andN([x, y])

    expect(bdd).toBe(robdd.and(x, y))
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const z   = robdd.variable()
    const bdd = robdd.andN([x, y, z])

    expect(bdd).toBe(robdd.and(robdd.and(x, y), z))
  })
})
