export declare class Polynomial {
  readonly degree: number
  coefficients: number[]

  constructor(coefficients?: number[])

  clone(): Polynomial
  evaluate(t: number): number
  scale(s: number): Polynomial
  _scale(s: number): this

  static operateTermwise(
    op: (c0: number, c1: number) => number,
    p1: Polynomial,
    p2: Polynomial,
    pd?: Polynomial,
  ): Polynomial

  add(p: Polynomial): Polynomial
  _add(p: Polynomial): this
  static add(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  sub(p: Polynomial): Polynomial
  _sub(p: Polynomial): this
  static sub(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  mul(p: Polynomial): Polynomial
  _mul(p: Polynomial): this
  static mul(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  toString(): string
}

export declare class PiecewisePolynomial {
  polynomials: Polynomial[]
  knots: number[]

  constructor(polynomials: Polynomial[], knots: number[])

  evaluate(t: number): number
  scale(s: number): PiecewisePolynomial
  add(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial
  sub(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial
  mul(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial
  split(newKnots: number[]): PiecewisePolynomial

  toString(): string
}
