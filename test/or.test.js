const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('and', () => {
  test('returns ROBDD.True if either argument is ROBDD.True', () => {
    const bdd = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.or(robdd.True, bdd)).toBe(robdd.True)
    expect(robdd.or(bdd, robdd.True)).toBe(robdd.True)
  })

  test('returns ROBDD.True when both arguments are ROBDD.True', () => {
    expect(robdd.or(robdd.False, robdd.False)).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = robdd.or(robdd.variable(), robdd.variable())

    expect(bdd._then).toBe(robdd.True)
    expect(bdd._else._then).toBe(robdd.True)
    expect(bdd._else._else).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = robdd.or(robdd.or(robdd.variable(), robdd.variable()), robdd.variable())

    expect(bdd._then).toBe(robdd.True)
    expect(bdd._else._then).toBe(robdd.True)
    expect(bdd._else._else._then).toBe(robdd.True)
    expect(bdd._else._else._else).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = robdd.or(robdd.eql(robdd.variable(), robdd.variable()), robdd.variable())

    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else._then).toBe(robdd.True)
    expect(bdd._then._else._else).toBe(robdd.False)
    expect(bdd._else._then._then).toBe(robdd.True)
    expect(bdd._else._then._else).toBe(robdd.False)
    expect(bdd._else._else).toBe(robdd.True)
  })
})
