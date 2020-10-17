const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('not', () => {
  test('returns ROBDD.False for ROBDD.True', () => {
    expect(robdd.not(robdd.True)).toBe(robdd.False)
  })

  test('returns ROBDD.True for ROBDD.False', () => {
    expect(robdd.not(robdd.False)).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (1/3)', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.not(robdd.and(variable_1, variable_2))

    expect(bdd._then._then).toBe(robdd.False)
    expect(bdd._then._else).toBe(robdd.True)
    expect(bdd._else).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (2/3)', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.not(robdd.or(variable_1, variable_2))

    expect(bdd._then).toBe(robdd.False)
    expect(bdd._else._then).toBe(robdd.False)
    expect(bdd._else._else).toBe(robdd.True)
  })

  test('check the result of the operation on a BDD (3/3)', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.not(robdd.eql(variable_1, variable_2))

    expect(bdd._then._then).toBe(robdd.False)
    expect(bdd._then._else).toBe(robdd.True)
    expect(bdd._else._then).toBe(robdd.True)
    expect(bdd._else._else).toBe(robdd.False)
  })
})
