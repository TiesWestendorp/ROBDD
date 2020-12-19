const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isSatisfiable', () => {
  test('returns false for ROBDD.False', () => {
    expect(ROBDD.False.isSatisfiable).toBe(false)
  })

  test('returns true otherwise', () => {
    let variable_1 = ROBDD.variable()
    let variable_2 = ROBDD.variable()
    let bdd = ROBDD.and(variable_1, variable_2)

    expect(variable_1.isSatisfiable).toBe(true)
    expect(variable_2.isSatisfiable).toBe(true)
    expect(bdd.isSatisfiable).toBe(true)
  })
})
