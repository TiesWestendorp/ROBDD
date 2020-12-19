const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('substitute', () => {
  beforeEach(() => {
    ROBDD.reset()
  })

  test('does not affect ROBDD.True or ROBDD.False', () => {
    expect(ROBDD.substitute(ROBDD.True,  { 0: 1 })).toBe(ROBDD.True)
    expect(ROBDD.substitute(ROBDD.False, { 0: 1 })).toBe(ROBDD.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = ROBDD.and(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.substitute(bdd, mapping)._label).toBe(2)
    expect(ROBDD.substitute(bdd, mapping)._then._label).toBe(3)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = ROBDD.or(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.substitute(bdd, mapping)._label).toBe(2)
    expect(ROBDD.substitute(bdd, mapping)._else._label).toBe(3)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = ROBDD.eql(ROBDD.variable(), ROBDD.variable())

    expect(ROBDD.substitute(bdd, mapping)._label).toBe(2)
    expect(ROBDD.substitute(bdd, mapping)._then._label).toBe(3)
    expect(ROBDD.substitute(bdd, mapping)._else._label).toBe(3)
  })
})
