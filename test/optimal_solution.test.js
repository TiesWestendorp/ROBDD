const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('solutions', () => {
  const x = ROBDD.variable()
  const y = ROBDD.variable()
  const weights = new Map([[x._label, 2], [y._label, -1]])

  test('throws an error when no solutions exist', () => {
    expect(() => {
        ROBDD.False.optimalSolution(weights)
    }).toThrow("No solution exists")
  })

  test('returns the optimal solution when there is only one feasible solution', () => {
    const [value, solution] = ROBDD.and(x, y).optimalSolution(weights)
    expect(value).toBe(1)
    expect(solution).toEqual(new Map([[x._label, true], [y._label, true]]))
  })

  test('returns the optimal solution when there are multiple feasible solutions', () => {
    const [value, solution] = ROBDD.or(ROBDD.and(x, z), ROBDD.and(y, z)).optimalSolution(weights)
    expect(value).toBe(2)
    expect(solution).toEqual(new Map([[x._label, true], [y._label, false]]))
  })  
})
