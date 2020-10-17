const robdd = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('isTerminal', () => {
  test('returns true for terminals', () => {
    expect(robdd.True.isTerminal).toBe(true)
    expect(robdd.False.isTerminal).toBe(true)
  })

  test('returns false for non-terminals', () => {
    let variable_1 = robdd.variable()
    let variable_2 = robdd.variable()
    let bdd = robdd.and(variable_1, variable_2)

    expect(variable_1.isTerminal).toBe(false)
    expect(variable_2.isTerminal).toBe(false)
    expect(bdd.isTerminal).toBe(false)
  })
})
