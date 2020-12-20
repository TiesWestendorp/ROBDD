class ROBDD {
  constructor(_label, _then, _else) {
    this._label = _label
    this._then  = _then
    this._else  = _else
  }

  get isTerminal()    { return false }
  get isSatisfiable() { return this !== ROBDD.False }
  get isTautology()   { return this === ROBDD.True  }
  numberOfSatisfyingAssignments(number_of_variables) {
    if (this.isTerminal) return this.value * Math.pow(2, number_of_variables)
    return (this._then.numberOfSatisfyingAssignments(number_of_variables) + this._else.numberOfSatisfyingAssignments(number_of_variables))/2
  }

  static cacheReset() {
    ROBDD.cache = {}
  }
  static reset() {
    ROBDD.cacheReset()
    ROBDD.vars = 0
  }
  static variable() {
    return ROBDD.get(ROBDD.vars++, ROBDD.True, ROBDD.False)
  }
  static get(_label, _then, _else) {
    if (_then === _else) {
      return _then
    }
    let robdd
    let cached = ROBDD.cache[_label]
    if (cached) {
      robdd = cached.find(ROBDD => ROBDD._then === _then && ROBDD._else === _else)
      if (!robdd) {
        robdd = new ROBDD(_label, _then, _else)
        cached.push(robdd, ROBDD.noCacheNot(robdd))
      }
    } else {
      robdd = new ROBDD(_label, _then, _else)
      ROBDD.cache[_label] = [robdd, ROBDD.noCacheNot(robdd)]
    }
    return robdd
  }

  /*
   * Negate the ROBDD without caching the result (DO NOT CALL)
   */
  static noCacheNot(A) {
    if (A === ROBDD.True)  return ROBDD.False
    if (A === ROBDD.False) return ROBDD.True
    return new ROBDD(A._label, ROBDD.noCacheNot(A._then), ROBDD.noCacheNot(A._else))
  }

  /*
   * Replace True by _then and False by _else recursively in A
   * TODO: fix
   */
  static conditional(A, _then, _else) {
    if (A === ROBDD.True)       return _then
    if (A === ROBDD.False)      return _else
    if (_then === _else)      return _then
    if (A === _then)          return ROBDD.conditional(A, ROBDD.True, _else)
    if (A === _else)          return ROBDD.conditional(A, _then, ROBDD.False)
    if (A === ROBDD.not(_then)) return ROBDD.conditional(A, ROBDD.False, _else)
    if (A === ROBDD.not(_else)) return ROBDD.conditional(A, _then, ROBDD.True)
    if (_then.isTerminal && _else.isTerminal) {
      return _then.value ? A : ROBDD.not(A)
    }
    let labels = [A._label]
    if (!_then.isTerminal) labels.push(_then._label)
    if (!_else.isTerminal) labels.push(_else._label)
    const rootLabel = Math.min(...labels)
    switch( 4 * (A._label === rootLabel) + 2 * (_then._label === rootLabel) + (_else._label === rootLabel) ) {
      case 1: return ROBDD.get(rootLabel, ROBDD.conditional(A, _then, _else._then),             ROBDD.conditional(A, _then, _else._else))
      case 2: return ROBDD.get(rootLabel, ROBDD.conditional(A, _then._then, _else),             ROBDD.conditional(A, _then._else, _else))
      case 3: return ROBDD.get(rootLabel, ROBDD.conditional(A, _then._then, _else._then),       ROBDD.conditional(A, _then._else, _else._else))
      case 4: return ROBDD.get(rootLabel, ROBDD.conditional(A._then, _then, _else),             ROBDD.conditional(A._else, _then, _else))
      case 5: return ROBDD.get(rootLabel, ROBDD.conditional(A._then, _then, _else._then),       ROBDD.conditional(A._else, _then, _else._else))
      case 6: return ROBDD.get(rootLabel, ROBDD.conditional(A._then, _then._then, _else),       ROBDD.conditional(A._else, _then._then, _else))
      case 7: return ROBDD.get(rootLabel, ROBDD.conditional(A._then, _then._then, _else._then), ROBDD.conditional(A._else, _then._else, _else._else))
    }
  }

  /*
   * Replace all labels according to mapping
   * Precondition: forall label1, label2: label1 < label2 => mapping[label1] < mapping[label2] (where implicitly mapping[label] === label when not label in mapping)
   */
  static substitute(A, mapping) {
    if (A === ROBDD.True)  return ROBDD.True
    if (A === ROBDD.False) return ROBDD.False
    return ROBDD.get(A._label in mapping ? mapping[A._label] : A._label, ROBDD.substitute(A._then, mapping), ROBDD.substitute(A._else, mapping))
  }

  /*
   * Unary + binary boolean operations
   */
  static not(A) {
    if (A === ROBDD.True)  return ROBDD.False
    if (A === ROBDD.False) return ROBDD.True
    return ROBDD.get(A._label, ROBDD.not(A._then), ROBDD.not(A._else))
  }
  static and(A, B) {
    if (A === ROBDD.True)   return B
    if (B === ROBDD.True)   return A
    if (A === ROBDD.False)  return ROBDD.False
    if (B === ROBDD.False)  return ROBDD.False
    if (A === B)            return A
    if (A === ROBDD.not(B)) return ROBDD.False
    if (A._label === B._label) {
      return ROBDD.get(A._label, ROBDD.and(A._then, B._then), ROBDD.and(A._else, B._else))
    } else if (A._label < B._label) {
      return ROBDD.get(A._label, ROBDD.and(A._then, B), ROBDD.and(A._else, B))
    } else {
      return ROBDD.get(B._label, ROBDD.and(A, B._then), ROBDD.and(A, B._else))
    }
  }
  static or(A, B) {
    if (A === ROBDD.True)   return ROBDD.True
    if (B === ROBDD.True)   return ROBDD.True
    if (A === ROBDD.False)  return B
    if (B === ROBDD.False)  return A
    if (A === B)            return A
    if (A === ROBDD.not(B)) return ROBDD.True
    if (A._label === B._label) {
      return ROBDD.get(A._label, ROBDD.or(A._then, B._then), ROBDD.or(A._else, B._else))
    } else if (A._label < B._label) {
      return ROBDD.get(A._label, ROBDD.or(A._then, B), ROBDD.or(A._else, B))
    } else {
      return ROBDD.get(B._label, ROBDD.or(A, B._then), ROBDD.or(A, B._else))
    }
  }
  static eql(A, B) {
    if (A === ROBDD.True)   return B
    if (B === ROBDD.True)   return A
    if (A === ROBDD.False)  return ROBDD.not(B)
    if (B === ROBDD.False)  return ROBDD.not(A)
    if (A === B)            return ROBDD.True
    if (A === ROBDD.not(B)) return ROBDD.False
    if (A._label === B._label) {
      return ROBDD.get(A._label, ROBDD.eql(A._then, B._then), ROBDD.eql(A._else, B._else))
    } else if (A._label < B._label) {
      return ROBDD.get(A._label, ROBDD.eql(A._then, B), ROBDD.eql(A._else, B))
    } else {
      return ROBDD.get(B._label, ROBDD.eql(A, B._then), ROBDD.eql(A, B._else))
    }
  }
  static xor(A, B)  { return ROBDD.not(ROBDD.eql(A, B)) }
  static nor(A, B)  { return ROBDD.not(ROBDD.or(A, B))  }
  static nand(A, B) { return ROBDD.not(ROBDD.and(A, B)) }
  static imp(A, B)  { return ROBDD.or(ROBDD.not(A), B)  }

  /*
   * n-ary boolean operations
   */
  static andN(As) {
    if (As.length === 0) return ROBDD.True
    if (As.length === 1) return As[0]
    if (As[0] === ROBDD.True)  return ROBDD.andN(As.slice(1))
    if (As[0] === ROBDD.False) return ROBDD.False
    return ROBDD.and(As[0], ROBDD.andN(As.slice(1)))
  }
  static orN(As) {
    if (As.length === 0) return ROBDD.True
    if (As.length === 1) return As[0]
    if (As[0] === ROBDD.True)  return ROBDD.True
    if (As[0] === ROBDD.False) return ROBDD.orN(As.slice(1))
    return ROBDD.or(As[0], ROBDD.orN(As.slice(1)))
  }

  /*
   * Quantifiers
   * Note: Complexity improvement possible for these methods by using binary
   *       rather than linear search, though this should make no difference
   *       in practice.
   * Precondition: labels sorted
   */
  static existsN(A, labels) {
    if (A.isTerminal) return A
    const index = labels.findIndex(label => label >= A._label)
    if (index === -1) return A
    if (A._label === labels[index]) {
      labels = labels.slice(index + 1)
      return ROBDD.or(ROBDD.existsN(A._then, labels), ROBDD.existsN(A._else, labels))
    } else {
      labels = labels.slice(index)
      return ROBDD.get(A._label, ROBDD.existsN(A._then, labels), ROBDD.existsN(A._else, labels))
    }
  }
  static forallN(A, labels) {
    if (A.isTerminal) return A
    const index = labels.findIndex(label => label >= A._label)
    if (index === -1) return A
    if (A._label === labels[index]) {
      labels = labels.slice(index + 1)
      return ROBDD.and(ROBDD.forallN(A._then, labels), ROBDD.forallN(A._else, labels))
    } else {
      labels = labels.slice(index)
      return ROBDD.get(A._label, ROBDD.forallN(A._then, labels), ROBDD.forallN(A._else, labels))
    }
  }
}

ROBDD.reset()
ROBDD.True  = Object.create(ROBDD.prototype, { value: { get: () => true  }, isTerminal: { get: () => true } })
ROBDD.False = Object.create(ROBDD.prototype, { value: { get: () => false }, isTerminal: { get: () => true } })

module.exports.ROBDD = ROBDD
