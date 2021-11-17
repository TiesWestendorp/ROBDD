const { ROBDD } = require('../lib/reduced-ordered-binary-decision-diagrams')

describe('toJSON', () => {
  test('returns the value as string for terminals', () => {
    expect(ROBDD.True.toJSON()).toBe("true")
    expect(ROBDD.False.toJSON()).toBe("false")
  })

  test('check the result of the operation on a BDD (1/2)', () => {
    ROBDD.reset()
    const x = ROBDD.variable()
    const y = ROBDD.variable()
    const bdd = ROBDD.or(x, y)

    expect(bdd.toJSON()).toStrictEqual({
      label: 0,
      then: "true",
      else: {
        label: 1,
        then: "true",
        else: "false"
      }
    })
  })

  test('check the result of the operation on a BDD (2/2)', () => {
    ROBDD.reset()
    const x   = ROBDD.variable()
    const y   = ROBDD.variable()
    const bdd = ROBDD.and(x, y)

    expect(bdd.toJSON()).toStrictEqual({
      label: 0,
      then: {
        label: 1,
        then: "true",
        else: "false"
      },
      else: "false"
    })
  })
})
