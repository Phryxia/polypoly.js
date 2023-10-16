import { Polynomial } from './Polynomial'
import { createMaxLessOrEqualFinder } from './BinarySearch'

const knotIndexFinder = createMaxLessOrEqualFinder((a, b) => a - b)

export class PiecewisePolynomial {
  /**
   * Create n-piecewise polynomial for (n - 1) `knots`.
   * Each k-th polynomial take place for [knots[k - 1], knots[k])
   * The behavior of duplicated knots is undefined.
   * @param {Polynomial[]} polynomials
   * @param {number[]} knots
   */
  constructor(polynomials, knots) {
    if (polynomials.length - knots.length !== 1) {
      throw new Error(
        `number of polynomials(${
          polynomials.length
        }) should be more than one knots(${knots.length + 1})`,
      )
    }

    /**
     * @type {Polynomial[]} n-length independent polynomials
     */
    this.polynomials = polynomials

    /**
     * @type {number[]} (n - 1)-length sorted knots which divides real set
     */
    this.knots = knots
  }

  /**
   * Evaluate this polynomial for given value `t`
   * This takes O(lg n) time complexity.
   * @param {number} t
   * @returns {number}
   */
  evaluate(t) {
    const index = knotIndexFinder(this.knots, t) + 1
    return this.polynomials[index].evaluate(t)
  }

  /**
   * Returns new `PiecewisePolynomial` from `this` scaled by `x`
   * @param {number} x
   * @returns {PiecewisePolynomial}
   */
  scale(x) {
    const result = new PiecewisePolynomial(this.polynomials, this.knots)
    result.polynomials = result.polynomials.map((poly) => poly.scale(x))
    return result
  }

  /**
   * Returns new `PiecewisePolynomial` from `this` added by `p`
   * If `p` is `Polynomial` then every piece will be added samely.
   * Otherwise, new knots will be computed within O(n) time complexity.
   * @param {Polynomial | PiecewisePolynomial} p
   * @returns {PiecewisePolynomial}
   */
  add(p) {
    return this.#operate(p, this.polynomials[0].add)
  }

  /**
   * Returns new `PiecewisePolynomial` from `this` multiplied by `p`
   * If `p` is `Polynomial` then every piece will be multiplied samely.
   * Otherwise, new knots will be computed within O(n) time complexity.
   * @param {Polynomial | PiecewisePolynomial} p
   * @returns {PiecewisePolynomial}
   */
  mul(p) {
    return this.#operate(p, this.polynomials[0].mul)
  }

  /**
   * Helper method for internal operation. Takes `p` and preprocess knots
   * if `p` is `PiecewisePolynomial`. Otherwise just apply operation evenly.
   * @param {Polynomial | PiecewisePolynomial} p
   * @param {(p: Polynomial) => Polynomial} op
   * @returns {PiecewisePolynomial}
   */
  #operate(p, op) {
    if (p.polynomials) {
      const newKnots = mergeKnots(this.knots, p.knots)
      const pA = this.split(newKnots)
      const pB = p.split(newKnots)
      pA.polynomials = pA.polynomials.map((polynomial, index) => {
        const tempOp = op.bind(polynomial)
        return tempOp(pB.polynomials[index])
      })
      return pA
    }

    const result = new PiecewisePolynomial(this.polynomials, this.knots)
    result.polynomials = result.polynomials.map((polynomial) => {
      const tempOp = op.bind(polynomial)
      return tempOp(p)
    })
    return result
  }

  /**
   * Returns new PiecewisePolynomial using given `newKnots`.
   * Note that `newKnots` ⊆ `this.knots`.
   * @param {number[]} newKnots
   * @returns {PiecewisePolynomial}
   */
  split(newKnots) {
    let oldPtr = 0
    const newPolynomials = []

    for (let newPtr = 0; newPtr < newKnots.length; ++newPtr) {
      newPolynomials.push(this.polynomials[oldPtr].clone())

      if (this.knots[oldPtr] === newKnots[newPtr]) {
        oldPtr = Math.min(oldPtr + 1, this.knots.length)
      }
    }
    newPolynomials.push(this.polynomials[oldPtr].clone())

    return new PiecewisePolynomial(newPolynomials, newKnots)
  }

  /**
   * Return stringify form of `this`
   * @returns {string}
   */
  toString() {
    let str = ''
    for (let i = 0; i <= this.knots.length; ++i) {
      str += `\n${this.knots[i - 1] ?? '-∞'} ~ ${
        this.knots[i] ?? '∞'
      }: ${this.polynomials[i].toString()}`
    }
    return str
  }
}

/**
 * Merge two increasing ordered knots
 * If there are several duplicated knots, then each of them will be transfered
 * to result knots. For example, [0, 0] and [0, 1, 1] will cause [0, 0, 1, 1].
 *
 * @param {number[]} knots0
 * @param {number[]} knots1
 */
function mergeKnots(knots0, knots1) {
  const knots = []

  let i0 = 0
  let i1 = 0
  while (i0 < knots0.length && i1 < knots1.length) {
    if (knots0[i0] === knots1[i1]) {
      knots.push(knots0[i0])
      i0 += 1
      i1 += 1
    } else if (knots0[i0] < knots1[i1]) {
      knots.push(knots0[i0])
      i0 += 1
    } else {
      knots.push(knotsi1[i1])
      i1 += 1
    }
  }
  knots.push(...knots0.slice(i0))
  knots.push(...knots1.slice(i1))
  return knots
}
