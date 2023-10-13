import { describe, expect, it, test } from 'vitest'
import { PiecewisePolynomial } from '../PiecewisePolynomial'
import { Polynomial } from '../Polynomial'

describe('PiecewisePolynomial.prototype.split', () => {
  it('should cut existing pieces using new knots', () => {
    const polys = [
      new Polynomial([0]),
      new Polynomial([1]),
      new Polynomial([2]),
    ]
    const pp0 = new PiecewisePolynomial(polys, [0, 1])
    const pp1 = pp0.split([-0.5, 0, 0.5, 1, 2])

    expect(pp1.knots).toMatchObject([-0.5, 0, 0.5, 1, 2])
    expect(pp1.polynomials).toMatchObject([
      polys[0],
      polys[0],
      polys[1],
      polys[1],
      polys[2],
      polys[2],
    ])
  })

  it('should evaluate the polynomial for valid position', () => {
    const polys = [
      new Polynomial([0]),
      new Polynomial([1]),
      new Polynomial([2]),
      new Polynomial([3]),
    ]
    const pp0 = new PiecewisePolynomial(polys, [0, 1, 2])

    expect(pp0.evaluate(-1)).toBe(0)
    expect(pp0.evaluate(0)).toBe(1)
    expect(pp0.evaluate(0.5)).toBe(1)
    expect(pp0.evaluate(1.5)).toBe(2)
    expect(pp0.evaluate(2.5)).toBe(3)
    expect(pp0.evaluate(3)).toBe(3)
  })
})
