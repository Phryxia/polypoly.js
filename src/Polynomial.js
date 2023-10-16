export class Polynomial {
  /**
   * Create polynomial having given coefficients.
   * If it's omitted or has zero legnth, than automatically fallback to
   * default value `[0]`
   * @param {number[]} [coefficients=[0]] start from 0-order (=constant)
   */
  constructor(coefficients = [0]) {
    if (!coefficients.length) {
      coefficients = [0]
    }

    /**
     * @type {number[]} start from 0-order(=constant)
     */
    this.coefficients = coefficients
  }

  /**
   * Clone new polynomial same to this
   * @returns {Polynomial}
   */
  clone() {
    return new Polynomial(this.coefficients.slice())
  }

  /**
   * Evaluate this polynomial with given t.
   * @param {number} t
   * @returns {number} P(t)
   */
  evaluate(t) {
    return this.coefficients.reduce(
      (acc, coefficient, index) => acc + coefficient * t ** index,
      0,
    )
  }

  /**
   * Returns new polynomial from `this` scaled by `x`
   * @param {number} x
   * @returns {Polynomial} `this * x`
   */
  scale(x) {
    return new Polynomial(
      this.coefficients.map((coefficient) => x * coefficient),
    )
  }

  /**
   * Returns new polynomial which adds `this` and `p`
   * @param {Polynomial} p
   * @returns {Polynomial} `this` + `p`
   */
  add(p) {
    return Polynomial.add(this, p)
  }

  /**
   * Add `p` to `this` and return `this`. This mutates original `this`.
   * @param {Polynomial} p
   * @returns {this}
   */
  _add(p) {
    for (let i = 0; i < p.coefficients.length; ++i) {
      this.coefficients[i] = (this.coefficients[i] ?? 0) + p.coefficients[i]
    }
    return this
  }

  /**
   * Add two polynomial
   * @param {Polynomial} p1
   * @param {Polynomial} p2
   * @returns {Polynomial} `p1` + `p2`
   */
  static add(p1, p2) {
    return new Polynomial(
      Array.from(
        new Array(Math.max(p1.coefficients.length, p2.coefficients.length)),
        (_, i) => (p1.coefficients[i] ?? 0) + (p2.coefficients[i] ?? 0),
      ),
    )
  }

  /**
   * Returns new polynomial which multiplies `this` and `p`
   * @param {Polynomial} p
   * @returns {Polynomial} `this` * `p`
   */
  mul(p) {
    return Polynomial.mul(this, p)
  }

  /**
   * Multiply `p` to `this` and return `this`. This mutates original `this`.
   * @param {Polynomial} p
   * @returns {this}
   */
  _mul(p) {
    const temp = Polynomial.mul(this, p)
    this.coefficients = temp.coefficients
    return this
  }

  /**
   * Multiply two polynomial
   * @param {Polynomial} p1
   * @param {Polynomial} p2
   * @returns {Polynomial} `p1` + `p2`
   */
  static mul(p1, p2) {
    const coefficient = []

    for (let i = 0; i < p1.coefficients.length; ++i) {
      for (let j = 0; j < p2.coefficients.length; ++j) {
        const order = i + j
        coefficient[order] ??= 0
        coefficient[order] += p1.coefficients[i] * p2.coefficients[j]
      }
    }

    return new Polynomial(coefficient)
  }

  /**
   * Returns stringify polynomial form
   * @returns {string}
   */
  toString() {
    return (
      this.coefficients
        .map(renderCoefficient)
        .filter(Boolean)
        .reverse()
        .join(' + ') || '0'
    )
  }

  get degree() {
    return this.coefficients.length - 1
  }
}

/**
 * Returns stringify terms
 * @param {number} coefficient
 * @param {number} order
 * @returns {string}
 */
function renderCoefficient(coefficient, order) {
  if (coefficient === 0) return ''

  if (order === 0) return coefficient.toString()

  const textCoefficient =
    coefficient === 1 ? '' : coefficient === -1 ? '-' : coefficient.toString()
  const textOrder = order === 1 ? '' : `^${order}`

  return `${textCoefficient}t${textOrder}`
}
