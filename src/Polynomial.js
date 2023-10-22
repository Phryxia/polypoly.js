import { add, sub } from './shared'

export class Polynomial {
  constructor(coefficients = [0]) {
    if (!coefficients.length) {
      coefficients = [0]
    }

    this.coefficients = coefficients
  }

  clone() {
    return new Polynomial(this.coefficients.slice())
  }

  evaluate(t) {
    return this.coefficients.reduce((acc, c, i) => acc + c * t ** i, 0)
  }

  scale(s) {
    return new Polynomial(this.coefficients.map((c) => s * c))
  }

  _scale(s) {
    this.coefficients.forEach((c, i) => {
      this.coefficients[i] = s * c
    })
    return this
  }

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

  add(p) {
    return Polynomial.operateTermwise(add, this, p)
  }

  _add(p) {
    return Polynomial.operateTermwise(add, this, p, this)
  }

  static add(p1, p2, pd) {
    return Polynomial.operateTermwise(add, p1, p2, pd)
  }

  sub(p) {
    return Polynomial.operateTermwise(sub, this, p)
  }

  _sub(p) {
    return Polynomial.operateTermwise(sub, this, p, this)
  }

  static sub(p1, p2, pd) {
    return Polynomial.operateTermwise(sub, p1, p2, pd)
  }

  mul(p) {
    return Polynomial.mul(this, p)
  }

  _mul(p) {
    return Polynomial.mul(this, p, this)
  }

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
