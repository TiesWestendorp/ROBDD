const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('and', () => {
  test('returns other argument if either argument is ROBDD.True', () => {
    const bdd = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.eql(robdd.True, bdd)).toBe(bdd)
    expect(robdd.eql(bdd, robdd.True)).toBe(bdd)
  })

  test('returns other argument negated if either argument is ROBDD.False', () => {
    const bdd = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.eql(robdd.False, bdd)).toBe(robdd.not(bdd))
    expect(robdd.eql(bdd, robdd.False)).toBe(robdd.not(bdd))
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = robdd.variable()
    const bdd = robdd.eql(x, x)

    expect(bdd).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = robdd.eql(robdd.variable(), robdd.variable())

    expect(bdd._then._then).toBe(robdd.True)
    expect(bdd._then._else).toBe(robdd.False)
    expect(bdd._else._then).toBe(robdd.False)
    expect(bdd._else._else).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = robdd.variable()
    const y   = robdd.variable()
    const bdd = robdd.eql(robdd.or(x, y), x)

    expect(bdd._then).toBe(robdd.True)
    expect(bdd._else).toBe(robdd.not(y))
  })
})
