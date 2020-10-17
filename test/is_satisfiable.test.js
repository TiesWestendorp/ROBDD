const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isSatisfiable', () => {
  test('returns false for ROBDD.False', () => {
    expect(robdd.False.isSatisfiable).toBe(false)
  })

  test('returns true otherwise', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.and(variable_1, variable_2)

    expect(variable_1.isSatisfiable).toBe(true)
    expect(variable_2.isSatisfiable).toBe(true)
    expect(bdd.isSatisfiable).toBe(true)
  })
})
