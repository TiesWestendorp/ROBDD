const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isTautology', () => {
  test('returns true for ROBDD.True', () => {
    expect(ROBDD.True.isTautology).toBe(true)
  })

  test('returns false otherwise', () => {
    let variable_1 = ROBDD.variable()
    let variable_2 = ROBDD.variable()
    let bdd = ROBDD.and(variable_1, variable_2)

    expect(variable_1.isTautology).toBe(false)
    expect(variable_2.isTautology).toBe(false)
    expect(bdd.isTautology).toBe(false)
  })
})
