const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('andN', () => {
  test('returns ROBDD.True if argument is []', () => {
    expect(ROBDD.andN([])).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = ROBDD.variable()
    const bdd = ROBDD.andN([x])

    expect(bdd).toBe(x)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const bdd = ROBDD.andN([x, y])

    expect(bdd).toBe(ROBDD.and(x, y))
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const z   = ROBDD.variable()
    const bdd = ROBDD.andN([x, y, z])

    expect(bdd).toBe(ROBDD.and(ROBDD.and(x, y), z))
  })
})
