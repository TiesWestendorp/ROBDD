const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isTerminal', () => {
  test('returns true for terminals', () => {
    expect(ROBDD.True.isTerminal).toBe(true)
    expect(ROBDD.False.isTerminal).toBe(true)
  })

  test('returns false for non-terminals', () => {
    let variable_1 = ROBDD.variable()
    let variable_2 = ROBDD.variable()
    let bdd = ROBDD.and(variable_1, variable_2)

    expect(variable_1.isTerminal).toBe(false)
    expect(variable_2.isTerminal).toBe(false)
    expect(bdd.isTerminal).toBe(false)
  })
})
