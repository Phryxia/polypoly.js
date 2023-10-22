export declare class Polynomial {
  /**
   * degree (=order) of this polynomial.
   */
  readonly degree: number

  /**
   * start from 0-order(=constant)
   */
  coefficients: number[]

  /**
   * Create polynomial having given coefficients.
   *
   * If it's omitted or has zero legnth, than automatically fallback to
   * default value `[0]`
   * @param coefficients start from 0-order (=constant)
   */
  constructor(coefficients?: number[])

  /**
   * Clone new polynomial same to this
   */
  clone(): Polynomial

  /**
   * Evaluate this polynomial with given *t*.
   * @param t
   * @returns *P(t)*
   */
  evaluate(t: number): number

  /**
   * Returns new polynomial from `this` scaled by `s`
   * @param s scale value
   * @returns new one `this * s`
   */
  scale(s: number): Polynomial

  /**
   * Scale this polynomial by `s` and return `this`
   * @param s scale value
   * @returns `this`
   */
  _scale(s: number): this

  /**
   * Apply binary operation `op` between two polynomials and put
   * result into `pd` and return `pd`. If `pd` is not given, it makes and return.
   *
   * Note that when `pd` is mutated, its `coefficients` array is mutated.
   * @param op
   * @param p1 source 1
   * @param p2 source 2
   * @param pd destination
   */
  static operateTermwise(
    op: (c0: number, c1: number) => number,
    p1: Polynomial,
    p2: Polynomial,
    pd?: Polynomial,
  ): Polynomial

  /**
   * Adds `this` and `p` and return as new one.
   * @param p
   * @returns new one
   */
  add(p: Polynomial): Polynomial

  /**
   * Add `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param p
   * @returns `this`
   */
  _add(p: Polynomial): this

  /**
   * Add two polynomial and put it to pd.
   * If `pd` is `undefined`, new one is returned.
   * @param p1
   * @param p2
   * @param pd
   * @returns `pd = p1 + p2`
   */
  static add(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  /**
   * Subtracts `this` and `p` and return as new one.
   * @param p
   * @returns new one
   */
  sub(p: Polynomial): Polynomial

  /**
   * Subtracts `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param  p
   * @returns `this`
   */
  _sub(p: Polynomial): this

  /**
   * Subtract two polynomial.
   * If `pd` is `undefined`, new one is returned.
   * @param  p1
   * @param  p2
   * @param  pd
   * @returns `pd = p1 - p2`
   */
  static sub(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  /**
   * Returns new polynomial which multiplies `this` and `p`.
   * @param p
   * @returns new one
   */
  mul(p: Polynomial): Polynomial

  /**
   * Multiply `p` to `this` and return `this`.
   * This mutates original `this`.
   * @param p
   * @returns `this`
   */
  _mul(p: Polynomial): this

  /**
   * Multiply `p1` with `p2` and put result into `pd`.
   * If `pd` is `undefined`, new one is returned.
   *
   * Note that the `pd.coefficients` is mutated.
   * @param p1 source 1
   * @param p2 source 2
   * @param pd destination
   * @returns `pd = p1 * p2`
   */
  static mul(p1: Polynomial, p2: Polynomial, pd?: Polynomial): Polynomial

  /**
   * Returns stringify polynomial form
   */
  toString(): string
}

export declare class PiecewisePolynomial {
  /**
   * *n*-length independent `Polynomial`s
   */
  polynomials: Polynomial[]

  /**
   * *(n - 1)*-length **sorted in non-decreasing order** knots which divides real set
   */
  knots: number[]

  /**
   * Create *n*-piecewise polynomial for *(n - 1)* `knots`.
   * Each `polynomials[k]` take place for the interval ***[knots[k - 1], knots[k])***
   * @param polynomials
   * @param knots
   */
  constructor(polynomials: Polynomial[], knots: number[])

  /**
   * Evaluate this polynomial for given value `t`.
   *
   * This takes *O(lg n)* time complexity for big(i.e. `>=200`) intervals.
   * Otherwise it takes *O(n)* time because of binary-search's overhead.
   * @param t Any real number
   * @returns *P(t)*
   */
  evaluate(t: number): number

  /**
   * Returns new `PiecewisePolynomial` from `this` scaled by `s`
   * @param s Any real number
   * @returns New scaled `PiecewisePolynomial`
   */
  scale(s: number): PiecewisePolynomial

  /**
   * Returns new `PiecewisePolynomial` from `this` added by `p`.
   *
   * If `p` is `Polynomial` then every piece will be added samely.
   * Otherwise, new knots will be computed within O(n) time complexity.
   * @param p
   * @returns New added `PiecewisePolynomial`
   */
  add(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial

  /**
   * Returns new `PiecewisePolynomial` from `this` subtracted by `p`.
   *
   * If `p` is `Polynomial` then every piece will be subtracted samely.
   * Otherwise, new knots will be computed within O(n) time complexity.
   * @param p
   * @returns New subtracted `PiecewisePolynomial`
   */
  sub(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial

  /**
   * Returns new `PiecewisePolynomial` from `this` multiplied by `p`.
   *
   * If `p` is `Polynomial` then every piece will be multiplied samely.
   * Otherwise, new knots will be computed within O(n) time complexity.
   * @param p
   * @returns New multiplied `PiecewisePolynomial`
   */
  mul(p: Polynomial | PiecewisePolynomial): PiecewisePolynomial

  /**
   * Returns new PiecewisePolynomial using given `newKnots`.
   *
   * Note that `newKnots` ⊆ `this.knots`.
   * @param newKnots
   * @returns New interval splited `PiecewisePolynomial`
   */
  split(newKnots: number[]): PiecewisePolynomial

  /**
   * Return stringify form of `this`
   */
  toString(): string
}
