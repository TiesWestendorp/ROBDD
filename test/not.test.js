const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('not', () => {
  test('returns ROBDD.False for ROBDD.True', () => {
    expect(ROBDD.not(ROBDD.True)).toBe(ROBDD.False)
  })

  test('returns ROBDD.True for ROBDD.False', () => {
    expect(ROBDD.not(ROBDD.False)).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const bdd = ROBDD.and(ROBDD.variable(), ROBDD.variable())
    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else).toBe(ROBDD.False)

    expect(ROBDD.not(bdd)._then._then).toBe(ROBDD.False)
    expect(ROBDD.not(bdd)._then._else).toBe(ROBDD.True)
    expect(ROBDD.not(bdd)._else).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())
    expect(bdd._then).toBe(ROBDD.True)
    expect(bdd._else._then).toBe(ROBDD.True)
    expect(bdd._else._else).toBe(ROBDD.False)

    expect(ROBDD.not(bdd)._then).toBe(ROBDD.False)
    expect(ROBDD.not(bdd)._else._then).toBe(ROBDD.False)
    expect(ROBDD.not(bdd)._else._else).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const bdd = ROBDD.eql(ROBDD.variable(), ROBDD.variable())
    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else._then).toBe(ROBDD.False)
    expect(bdd._else._else).toBe(ROBDD.True)

    expect(ROBDD.not(bdd)._then._then).toBe(ROBDD.False)
    expect(ROBDD.not(bdd)._then._else).toBe(ROBDD.True)
    expect(ROBDD.not(bdd)._else._then).toBe(ROBDD.True)
    expect(ROBDD.not(bdd)._else._else).toBe(ROBDD.False)
  })
})
