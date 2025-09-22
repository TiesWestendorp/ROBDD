const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('solutions', () => {
  const x = ROBDD.variable()
  const y = ROBDD.variable()

  test('returns zero when no solutions exist', () => {
    expect(ROBDD.False.numberOfSatisfyingAssignments([x._label])).toBe(0)
  })

  test('returns one when there is only one solution', () => {
    expect(ROBDD.and(x, y).numberOfSatisfyingAssignments([x._label, y._label])).toBe(1)
  })

  test('generates all solutions when there are multiple', () => {
    expect(ROBDD.or(x, y).numberOfSatisfyingAssignments([x._label, y._label])).toBe(3)
  })

  test('generates all assignments for redundant variables', () => {
    expect(x.numberOfSatisfyingAssignments([x._label, y._label])).toBe(2)
  })

  test('throws an error when required variable labels are unspecified', () => {
    expect(() => {
        Array.from(...ROBDD.or(x, y).numberOfSatisfyingAssignments([x._label])) // Missing y._label
    }).toThrow("Unexpected variable label")
  })
})
