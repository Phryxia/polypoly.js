import { add, sub } from './shared'

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
    return this.coefficients.reduce((acc, c, i) => acc + c * t ** i, 0)
  }

  /**
   * Returns new polynomial from `this` scaled by `x`
   * @param {number} s scale value
   * @returns {Polynomial} `this * x`
   */
  scale(s) {
    return new Polynomial(this.coefficients.map((c) => s * c))
  }

  /**
   * Scale this polynomial by `x` and return `this`
   * @param {number} s scale value
   * @returns {this} `this`
   */
  _scale(s) {
    this.coefficients.forEach((c, i) => {
      this.coefficients[i] = s * c
    })
    return this
  }

  /**
   * Apply binary operation `op` between two polynomials and put
   * result into `pd` and return `pd`. If `pd` is not given, it makes and return.
   * Note that when `pd` is mutated, its `coefficients` array is mutated.
   * @param {(c0: number, c1: number) => number} op
   * @param {Polynomial} p1 source 1
   * @param {Polynomial} p2 source 2
   * @param {Polynomial | undefined} pd destination
   */
  static operateTermwise(op, p1, p2, pd) {
    const length = Math.max(p1.coefficients.length, p2.coefficients.length)

    if (!pd) {
      pd = new Polynomial(Array.from(new Array(length), () => 0))
    }

    pd.coefficients.forEach((_, i) => {
      pd.coefficients[i] = op(p1.coefficients[i] ?? 0, p2.coefficients[i] ?? 0)
    })

    return pd
  }

  /**
   * Adds `this` and `p` and return as new one.
   * @param {Polynomial} p
   * @returns {Polynomial} new one
   */
  add(p) {
    return Polynomial.operateTermwise(add, this, p)
  }

  /**
   * Add `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param {Polynomial} p
   * @returns {this}
   */
  _add(p) {
    return Polynomial.operateTermwise(add, this, p, this)
  }

  /**
   * Add two polynomial and put it to pd.
   * If `pd` is `undefined`, new one is returned.
   * @param {Polynomial} p1
   * @param {Polynomial} p2
   * @param {Polynomial | undefined} pd
   * @returns {Polynomial} `pd = p1 + p2`
   */
  static add(p1, p2, pd) {
    return Polynomial.operateTermwise(add, p1, p2, pd)
  }

  /**
   * Subtracts `this` and `p` and return as new one.
   * @param {Polynomial} p
   * @returns {Polynomial} new one
   */
  sub(p) {
    return Polynomial.operateTermwise(sub, this, p)
  }

  /**
   * Subtracts `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param {Polynomial} p
   * @returns {this}
   */
  _sub(p) {
    return Polynomial.operateTermwise(sub, this, p, this)
  }

  /**
   * Subtract two polynomial.
   * If `pd` is `undefined`, new one is returned.
   * @param {Polynomial} p1
   * @param {Polynomial} p2
   * @param {Polynomial | undefined} pd
   * @returns {Polynomial}
   */
  static sub(p1, p2, pd) {
    return Polynomial.operateTermwise(sub, p1, p2, pd)
  }

  /**
   * Returns new polynomial which multiplies `this` and `p`
   * @param {Polynomial} p
   * @returns {Polynomial} new one
   */
  mul(p) {
    return Polynomial.mul(this, p)
  }

  /**
   * Multiply `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param {Polynomial} p
   * @returns {this}
   */
  _mul(p) {
    return Polynomial.mul(this, p, this)
  }

  /**
   * Multiply `p1` with `p2` and put result into `pd`.
   * If `pd` is `undefined`, new one is returned.
   * Note that the `pd.coefficients` is mutated.
   * @param {Polynomial} p1 source 1
   * @param {Polynomial} p2 source 2
   * @param {Polynomial | undefined} pd destination
   * @returns {Polynomial}
   */
  static mul(p1, p2, pd) {
    const coefficients = []

    for (let i = 0; i < p1.coefficients.length; ++i) {
      for (let j = 0; j < p2.coefficients.length; ++j) {
        const order = i + j
        coefficients[order] ??= 0
        coefficients[order] += p1.coefficients[i] * p2.coefficients[j]
      }
    }

    if (!pd) {
      return new Polynomial(coefficients)
    }
    coefficients.forEach((c, i) => (pd.coefficients[i] = c))
    return pd
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

  /**
   * degree (=order) of this polynomial.
   * @readonly
   * @type {number}
   */
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
