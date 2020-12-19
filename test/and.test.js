const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('and', () => {
  test('returns ROBDD.False if either argument is ROBDD.False', () => {
    const bdd = ROBDD.and(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.and(ROBDD.False, bdd)).toBe(ROBDD.False)
    expect(ROBDD.and(bdd, ROBDD.False)).toBe(ROBDD.False)
  })

  test('returns ROBDD.True when both arguments are ROBDD.True', () => {
    expect(ROBDD.and(ROBDD.True, ROBDD.True)).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = ROBDD.and(ROBDD.variable(), ROBDD.variable())

    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = ROBDD.and(ROBDD.or(ROBDD.variable(), ROBDD.variable()), ROBDD.variable())

    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else._then._then).toBe(ROBDD.True)
    expect(bdd._else._then._else).toBe(ROBDD.False)
    expect(bdd._else._else).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = ROBDD.and(ROBDD.eql(ROBDD.variable(), ROBDD.variable()), ROBDD.variable())

    expect(bdd._then._then._then).toBe(ROBDD.True)
    expect(bdd._then._then._else).toBe(ROBDD.False)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else._then).toBe(ROBDD.False)
    expect(bdd._else._else._then).toBe(ROBDD.True)
    expect(bdd._else._else._else).toBe(ROBDD.False)
  })
})
