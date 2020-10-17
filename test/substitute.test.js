const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('substitute', () => {
  beforeEach(() => {
    robdd.reset()
  })

  test('does not affect ROBDD.True or ROBDD.False', () => {
    expect(robdd.substitute(robdd.True,  { 0: 1 })).toBe(robdd.True)
    expect(robdd.substitute(robdd.False, { 0: 1 })).toBe(robdd.False)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = robdd.and(robdd.variable(), robdd.variable())

    expect(robdd.substitute(bdd, mapping)._label).toBe(2)
    expect(robdd.substitute(bdd, mapping)._then._label).toBe(3)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = robdd.or(robdd.variable(), robdd.variable())

    expect(robdd.substitute(bdd, mapping)._label).toBe(2)
    expect(robdd.substitute(bdd, mapping)._else._label).toBe(3)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    const mapping = { 0: 2, 1: 3 }
    const bdd = robdd.eql(robdd.variable(), robdd.variable())

    expect(robdd.substitute(bdd, mapping)._label).toBe(2)
    expect(robdd.substitute(bdd, mapping)._then._label).toBe(3)
    expect(robdd.substitute(bdd, mapping)._else._label).toBe(3)
  })
})
