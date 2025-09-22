const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('solutions', () => {
  const x = ROBDD.variable()
  const y = ROBDD.variable()

  test('generates no solutions when there are none', () => {
    const solutions = ROBDD.False.solutions([x._label])
    expect(solutions.next().done).toBe(true)
  })

  test('generates the solutions when there is only one', () => {
    const solutions = ROBDD.and(x, y).solutions([x._label, y._label])
    expect(solutions.next().value).toEqual(new Map([[x._label, true], [y._label, true]]))
    expect(solutions.next().done).toBe(true)
  })

  test('generates all solutions when there are multiple', () => {
    const solutions = ROBDD.or(x, y).solutions([x._label, y._label])
    expect(solutions.next().value).toEqual(new Map([[x._label, true], [y._label, false]]))
    expect(solutions.next().value).toEqual(new Map([[x._label, true], [y._label, true]]))
    expect(solutions.next().value).toEqual(new Map([[x._label, false], [y._label, true]]))
    expect(solutions.next().done).toBe(true)
  })

  test('generates all assignments for redundant variables', () => {
    const solutions = x.solutions([x._label, y._label])
    expect(solutions.next().value).toEqual(new Map([[x._label, true], [y._label, false]]))
    expect(solutions.next().value).toEqual(new Map([[x._label, true], [y._label, true]]))
    expect(solutions.next().done).toBe(true)
  })

  test('throws an error when required variable labels are unspecified', () => {
    expect(() => {
        Array.from(...ROBDD.or(x, y).solutions([x._label])) // Missing y._label
    }).toThrow("Unexpected variable label")
  })
})
