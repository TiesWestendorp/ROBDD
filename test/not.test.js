const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('not', () => {
  test('returns ROBDD.False for ROBDD.True', () => {
    expect(robdd.not(robdd.True)).toBe(robdd.False)
  })

  test('returns ROBDD.True for ROBDD.False', () => {
    expect(robdd.not(robdd.False)).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = robdd.and(robdd.variable(), robdd.variable())
    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else).toBe(robdd.False)

    expect(robdd.not(bdd)._then._then).toBe(robdd.False)
    expect(robdd.not(bdd)._then._else).toBe(robdd.True)
    expect(robdd.not(bdd)._else).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = robdd.or(robdd.variable(), robdd.variable())
    expect(bdd._then).toBe(robdd.True)
    expect(bdd._else._then).toBe(robdd.True)
    expect(bdd._else._else).toBe(robdd.False)

    expect(robdd.not(bdd)._then).toBe(robdd.False)
    expect(robdd.not(bdd)._else._then).toBe(robdd.False)
    expect(robdd.not(bdd)._else._else).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = robdd.eql(robdd.variable(), robdd.variable())
    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else._then).toBe(robdd.False)
    expect(bdd._else._else).toBe(robdd.True)

    expect(robdd.not(bdd)._then._then).toBe(robdd.False)
    expect(robdd.not(bdd)._then._else).toBe(robdd.True)
    expect(robdd.not(bdd)._else._then).toBe(robdd.True)
    expect(robdd.not(bdd)._else._else).toBe(robdd.False)
  })
})
