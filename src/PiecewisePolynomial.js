import { Polynomial } from './Polynomial'
import { createMaxLessOrEqualFinder } from './BinarySearch'

export class PiecewisePolynomial {
  constructor(polynomials, knots) {
    if (polynomials.length - knots.length !== 1) {
      throw new Error(
        `number of polynomials(${
          polynomials.length
        }) should be more than one knots(${knots.length + 1})`,
      )
    }

    this.polynomials = polynomials
    this.knots = knots

    if (knots.length >= 200) {
      this.knotIndexFinder = createMaxLessOrEqualFinder((a, b) => a - b)
    } else {
      this.knotIndexFinder = (list, target) => {
        for (let i = list.length - 1; i >= 0; --i) {
          if (list[i] <= target) return i
        }
        return -1
      }
    }
  }

  evaluate(t) {
    const index = this.knotIndexFinder(this.knots, t) + 1
    return this.polynomials[index].evaluate(t)
  }

  scale(x) {
    const result = new PiecewisePolynomial(this.polynomials, this.knots)
    result.polynomials = result.polynomials.map((poly) => poly.scale(x))
    return result
  }

  add(p) {
    return this.#operate(p, Polynomial.add)
  }

  sub(p) {
    return this.#operate(p, Polynomial.sub)
  }

  mul(p) {
    return this.#operate(p, Polynomial.mul)
  }

  /**
   * Helper method for internal operation. Takes `p` and preprocess knots
   * if `p` is `PiecewisePolynomial`. Otherwise just apply operation evenly.
   * @param {Polynomial | PiecewisePolynomial} p
   * @param {(p1: Polynomial, p2: Polynomial) => Polynomial} op
   * @returns {PiecewisePolynomial}
   */
  #operate(p, op) {
    if (p.polynomials) {
      const newKnots = mergeKnots(this.knots, p.knots)
      const pA = this.split(newKnots)
      const pB = p.split(newKnots)
      pA.polynomials = pA.polynomials.map((polynomial, index) =>
        op(polynomial, pB.polynomials[index]),
      )
      return pA
    }

    const result = new PiecewisePolynomial(this.polynomials, this.knots)
    result.polynomials = result.polynomials.map((polynomial) =>
      op(polynomial, p),
    )
    return result
  }

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
      knots.push(knots1[i1])
      i1 += 1
    }
  }
  knots.push(...knots0.slice(i0))
  knots.push(...knots1.slice(i1))
  return knots
}
