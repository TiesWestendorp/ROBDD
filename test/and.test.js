const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('and', () => {
  test('returns ROBDD.False if either argument is ROBDD.False', () => {
    const bdd = robdd.and(robdd.variable(), robdd.variable())

    expect(robdd.and(robdd.False, bdd)).toBe(robdd.False)
    expect(robdd.and(bdd, robdd.False)).toBe(robdd.False)
  })

  test('returns ROBDD.True when both arguments are ROBDD.True', () => {
    expect(robdd.and(robdd.True, robdd.True)).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = robdd.and(robdd.variable(), robdd.variable())

    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = robdd.and(robdd.or(robdd.variable(), robdd.variable()), robdd.variable())

    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else._then._then).toBe(robdd.True)
    expect(bdd._else._then._else).toBe(robdd.False)
    expect(bdd._else._else).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = robdd.and(robdd.eql(robdd.variable(), robdd.variable()), robdd.variable())

    expect(bdd._then._then._then).toBe(robdd.True)
    expect(bdd._then._then._else).toBe(robdd.False)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else._then).toBe(robdd.False)
    expect(bdd._else._else._then).toBe(robdd.True)
    expect(bdd._else._else._else).toBe(robdd.False)
  })
})
