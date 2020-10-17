const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isTautology', () => {
  test('returns true for ROBDD.True', () => {
    expect(robdd.True.isTautology).toBe(true)
  })

  test('returns false otherwise', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.and(variable_1, variable_2)

    expect(variable_1.isTautology).toBe(false)
    expect(variable_2.isTautology).toBe(false)
    expect(bdd.isTautology).toBe(false)
  })
})
