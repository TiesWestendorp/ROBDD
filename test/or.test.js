const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('and', () => {
  test('returns ROBDD.True if either argument is ROBDD.True', () => {
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.or(ROBDD.True, bdd)).toBe(ROBDD.True)
    expect(ROBDD.or(bdd, ROBDD.True)).toBe(ROBDD.True)
  })

  test('returns ROBDD.True when both arguments are ROBDD.True', () => {
    expect(ROBDD.or(ROBDD.False, ROBDD.False)).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(bdd._then).toBe(ROBDD.True)
    expect(bdd._else._then).toBe(ROBDD.True)
    expect(bdd._else._else).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = ROBDD.or(ROBDD.or(ROBDD.variable(), ROBDD.variable()), ROBDD.variable())

    expect(bdd._then).toBe(ROBDD.True)
    expect(bdd._else._then).toBe(ROBDD.True)
    expect(bdd._else._else._then).toBe(ROBDD.True)
    expect(bdd._else._else._else).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = ROBDD.or(ROBDD.eql(ROBDD.variable(), ROBDD.variable()), ROBDD.variable())

    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else._then).toBe(ROBDD.True)
    expect(bdd._then._else._else).toBe(ROBDD.False)
    expect(bdd._else._then._then).toBe(ROBDD.True)
    expect(bdd._else._then._else).toBe(ROBDD.False)
    expect(bdd._else._else).toBe(ROBDD.True)
  })
})
