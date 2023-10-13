import { describe, expect, test } from 'vitest'
import { Polynomial } from '..'

describe('Polynomial.add', () => {
  test("it should add each polynomial's coefficients", () => {
    const pa = new Polynomial([1, 2, 3, 4])
    const pb = new Polynomial([5, 6, 7, 8])
    const pc = Polynomial.add(pa, pb)

    expect(pc.coefficients).toMatchObject([6, 8, 10, 12])
  })

  test('it should add properly even they have different length', () => {
    const pa = new Polynomial([1])
    const pb = new Polynomial([2, 3])

    expect(Polynomial.add(pa, pb).coefficients).toMatchObject([3, 3])
    expect(Polynomial.add(pb, pa).coefficients).toMatchObject([3, 3])
  })
})

describe('Polynomial.mul', () => {
  test("it should multiply each polynomial's coefficients", () => {
    const pa = new Polynomial([1, 2, 3])
    const pb = new Polynomial([5, 6, 7])
    const pc = Polynomial.mul(pa, pb)

    new Polynomial()

    expect(pc.coefficients).toMatchObject([5, 16, 34, 32, 21])
  })

  test('it should multiply properly even they have different length', () => {
    const pa = new Polynomial([2])
    const pb = new Polynomial([3, 4])

    expect(Polynomial.mul(pa, pb).coefficients).toMatchObject([6, 8])
    expect(Polynomial.mul(pb, pa).coefficients).toMatchObject([6, 8])
  })
})
