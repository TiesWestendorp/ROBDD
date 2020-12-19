const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('eql', () => {
  test('returns other argument if either argument is ROBDD.True', () => {
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.eql(ROBDD.True, bdd)).toBe(bdd)
    expect(ROBDD.eql(bdd, ROBDD.True)).toBe(bdd)
  })

  test('returns other argument negated if either argument is ROBDD.False', () => {
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.eql(ROBDD.False, bdd)).toBe(ROBDD.not(bdd))
    expect(ROBDD.eql(bdd, ROBDD.False)).toBe(ROBDD.not(bdd))
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const x   = ROBDD.variable()
    const bdd = ROBDD.eql(x, x)

    expect(bdd).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const bdd = ROBDD.eql(ROBDD.variable(), ROBDD.variable())

    expect(bdd._then._then).toBe(ROBDD.True)
    expect(bdd._then._else).toBe(ROBDD.False)
    expect(bdd._else._then).toBe(ROBDD.False)
    expect(bdd._else._else).toBe(ROBDD.True)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const bdd = ROBDD.eql(ROBDD.or(x, y), x)

    expect(bdd._then).toBe(ROBDD.True)
    expect(bdd._else).toBe(ROBDD.not(y))
  })
})
