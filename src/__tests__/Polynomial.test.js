import { describe, expect, test } from 'vitest'
import { Polynomial } from '..'

describe('Polynomial.operateTermwise', () => {
  test('it should not mutate when there is no pd', () => {
    const pa = new Polynomial([1])
    const pb = new Polynomial([2])
    const pc = Polynomial.operateTermwise(() => 3, pa, pb)

    expect(pc).not.toBe(pa)
    expect(pa.coefficients).toMatchObject([1])
    expect(pb.coefficients).toMatchObject([2])
    expect(pc.coefficients).toMatchObject([3])
  })

  test('it should mutate when there is pd = pa', () => {
    const pa = new Polynomial([1])
    const pb = new Polynomial([2])
    const pc = Polynomial.operateTermwise(() => 3, pa, pb, pa)

    expect(pc).toBe(pa)
    expect(pa.coefficients).toMatchObject([3])
    expect(pb.coefficients).toMatchObject([2])
  })

  test("it should mutate pd's coefficients", () => {
    const coefficients = [1]
    const pa = new Polynomial(coefficients)
    const pb = new Polynomial([1])
    const pc = Polynomial.operateTermwise(() => 3, pa, pb, pa)

    expect(pc.coefficients).toBe(coefficients)
  })

  test('it should work propelry even they have different length', () => {
    const pa = new Polynomial([1])
    const pb = new Polynomial([2, 3])

    expect(
      Polynomial.operateTermwise(() => 4, pa, pb).coefficients,
    ).toMatchObject([4, 4])
    expect(
      Polynomial.operateTermwise(() => 4, pb, pa).coefficients,
    ).toMatchObject([4, 4])
  })
})

describe('Polynomial.add', () => {
  test("it should add each polynomial's coefficients", () => {
    const pa = new Polynomial([1, 2, 3, 4])
    const pb = new Polynomial([5, 6, 7, 8])
    const pc = Polynomial.add(pa, pb)

    expect(pc.coefficients).toMatchObject([6, 8, 10, 12])
  })
})

describe('Polynomial.sub', () => {
  test("it should subtract each polynomial's coefficients", () => {
    const pa = new Polynomial([1, 2, 3, 4])
    const pb = new Polynomial([5, 6, 7, 8])

    expect(Polynomial.sub(pa, pb).coefficients).toMatchObject([-4, -4, -4, -4])
    expect(Polynomial.sub(pb, pa).coefficients).toMatchObject([4, 4, 4, 4])
  })
})

describe('Polynomial.mul', () => {
  test("it should multiply each polynomial's coefficients", () => {
    const pa = new Polynomial([1, 2, 3])
    const pb = new Polynomial([5, 6, 7])
    const pc = Polynomial.mul(pa, pb)

    expect(pc.coefficients).toMatchObject([5, 16, 34, 32, 21])
  })

  test('it should multiply properly even they have different length', () => {
    const pa = new Polynomial([2])
    const pb = new Polynomial([3, 4])

    expect(Polynomial.mul(pa, pb).coefficients).toMatchObject([6, 8])
    expect(Polynomial.mul(pb, pa).coefficients).toMatchObject([6, 8])
  })

  test('it should multiply without mutation', () => {
    const pa = new Polynomial([2])
    const pb = new Polynomial([3, 4])
    const pc = pa.mul(pb)

    expect(pc).not.toBe(pa)
  })

  test('it should multiply without mutation', () => {
    const coefficients = [2]
    const pa = new Polynomial(coefficients)
    const pb = new Polynomial([3, 4])
    const pc = pa._mul(pb)

    expect(pc).toBe(pa)
    expect(pc.coefficients).toBe(coefficients)
  })
})

describe('Polynomial.prototype.scale', () => {
  test('it should scale without mutation', () => {
    const p1 = new Polynomial([1, 2, 3])
    const p2 = p1.scale(-1)

    expect(p2).not.toBe(p1)
    expect(p2.coefficients).not.toBe(p1.coefficients)
    expect(p2.coefficients).toMatchObject([-1, -2, -3])
  })

  test('it should scale with mutation', () => {
    const p1 = new Polynomial([1, 2, 3])
    const p2 = p1._scale(-1)

    expect(p2).toBe(p1)
    expect(p2.coefficients).toBe(p1.coefficients)
    expect(p2.coefficients).toMatchObject([-1, -2, -3])
  })
})

describe('Polynomial.prototype.degree', () => {
  test('it should return the number of coefficients - 1', () => {
    const p = new Polynomial([0, 1, 2, 3, 4])

    expect(p.degree).toBe(4)
  })
})
