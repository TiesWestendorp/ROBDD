const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('solutions', () => {
  const x = ROBDD.variable()
  const y = ROBDD.variable()
  const z = ROBDD.variable()

  test('returns zero when no solutions exist', () => {
    expect(ROBDD.False.numberOfSatisfyingAssignments([x._label])).toBe(0)
  })

  test('returns 2^n for ROBDD.True', () => {
    expect(ROBDD.True.numberOfSatisfyingAssignments([x._label])).toBe(2)
    expect(ROBDD.True.numberOfSatisfyingAssignments([x._label, y._label])).toBe(4)
    expect(ROBDD.True.numberOfSatisfyingAssignments([x._label, y._label, z._label])).toBe(8)
  })

  test('returns one when there is only one solution', () => {
    expect(ROBDD.and(x, y).numberOfSatisfyingAssignments([x._label, y._label])).toBe(1)
  })

  test('returns the correct number of solutions when there are multiple', () => {
    expect(ROBDD.or(x, y).numberOfSatisfyingAssignments([x._label, y._label])).toBe(3)
  })

  test('returns the correct number of solutions when there are redundant variables', () => {
    expect(x.numberOfSatisfyingAssignments([x._label, y._label])).toBe(2)
    expect(y.numberOfSatisfyingAssignments([x._label, y._label])).toBe(2)
  })

  test('returns the correct number of solutions for more complex examples', () => {
    expect(ROBDD.or(x, ROBDD.eql(y, z)).numberOfSatisfyingAssignments([x._label, y._label, z._label])).toBe(6)
  })

  test('throws an error when required variable labels are unspecified', () => {
    expect(() => {
        Array.from(...ROBDD.or(x, y).numberOfSatisfyingAssignments([x._label])) // Missing y._label
    }).toThrow("Unexpected variable label")
  })
})
