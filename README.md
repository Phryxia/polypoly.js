# PolyPoly.js

Simple JavaScript piecewise polynomial library. It's well defined and pass elaborated tests.

## Install

```
npm i @phryxia/polypoly
```

If you use other package manager, feel free to use them.

## Features

- Scaling, addition, multiplication of (piecewise) polynomials
- Piecewise polynomials which have different intervals don't matter
- Fast evaluation using binary search for big (>=200) piecewise polynomials
- Can have zero length interval though it doesn't evaluated.
   - Still this is helpful for some cases because it holds internal expressions.

## Usage

### `Polynomial`

Simple class which represents a single polynomial. If there is no given coefficients or having zero coefficient, it fallbacks to `[0]`.

```js
const poly0 = new Polynomial([1, 2, 3]) // 3t^2 + 2t + 1
const poly1 = new Polynomial([0, 2, 0, 4]) // 4t^3 + 2t
```

#### Evaluation

Evaluation doesn't matter. This takes *θ(d)* time complexity where *d* is the degree of the polynomial. The optimized implementation for sparse polynomial (i.e. having few coefficients) is on plan.

```js
const y = poly0.evaluate(3.141592)
```

If you want to use coefficients, feel free to access them directly.

```js
poly.coefficients[0] = -2.7184
```

#### Operations

You can `add`, `subtract` or `multiply` them. Also you can `scale` without creating 1-length polynomial. Same methods but starting with `_` do mutable behavior, while the others are immutable.

```js
const poly2 = poly0.add(poly1) // 4t^3 + 3t^2 + 4t + 1
const poly3 = poly0.mul(poly1) // 12t^5 + 8t^4 + 10t^3 + 4t^2 + 2t
const poly4 = poly0.scale(3) // 9t^2 + 6t + 3
```

### `PiecewisePolynomial`

Simple(?) class which represents multiple polynomials with given intervals.

`N` intervals with `Polynomial`s should be represented as `N - 1` real numbers (called `knots`) in **non decreasing order**. If the length of these are not matched, error will be thrown.

```js
const pp0 = new PiecewisePolynomial(
  [
    new Polynomial([1]), 
    new Polynomial([1, 2]), 
    new Polynomial([1, 2, 3])
  ],
  [0, 1],
)
```

#### Evaluation

You can evaluate any real number like `Polynomial`. It selects the i-th interval for *x* where *x* ∈ `[knots[i], knots[i + 1] ?? ∞)` and evaluates for the polynomial of such interval. This behavior **skips zero length interval**. 

```js
const p = new PiecewisePolynomial([
  new Polynomial([0]),
  new Polynomial([1]),
  new Polynomial([2]),
  new Polynomial([3]),
  new Polynomial([4]),
], [0, 1, 1, 2])

p.evaluate(-1) === 0
p.evaluate(0) === 1
p.evaluate(0.5) === 1
p.evaluate(1) === 3 // third polynomial [2] is skipped
p.evaluate(2) === 4
```

Note that evaluation uses [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) so that huge intervals can be determined quickly. It takes *O(d lg n)* time complexity where *d* is the maximum degree of polynomials and *n* is the number of intervals.

#### Operations

You can `add`, `subtract` or `multiply` with either `Polynomial` or `PiecewisePolynomial`. Also you can multiply scalar without creating 1-length polynomial. Note that `PiecewisePolynomial` doesn't support for mutable API because of their complexity.

#### Having different `knots`

If two polynomials have different `knots` then it properly merges them with following manners

- `newKnots` = `knots1` ∪ `knots2`
- If `x` is *k1*-duplicated in `knots1` and *k2*-duplicated in `knots2` (*k1*, *k2* may *0*), then `newKnots` have *max(k1, k2)*-duplicated `x`.
- When two interval shares equal upper bound, they don't appear again.

See following example.

```
p1
polynomial a   b   c   d
knots        0   1   1

p2
polynomial A   B   C   D
knots        0   0   2

p1 + p2
polynomial a+A   b+B   b+C   c+C   d+C   d+D
knots          0     0     1     1     2
```

Because of this behavior, 0-length intervals are always skipped when evaluated. But combining two `PicewisePolynomial`s won't erase such intervals. This is helpful when you compute NURBS like things.

## Contributions

I always appreciated for your considerations and enthusiasm!

1. BEFORE you create a PR, please **raise an issue and describe** what you're going to do. This prevents unhelpful efforts for too early implementation. There is no strict template for raising issues, but please write it in English so that communities can understand it.
2. Please enable `prettier` formatter and follow repository's `.prettierrc` for your IDE. If you don't know how to do so, please [google it](https://www.google.com/search?q=vscode+prettier+setting).
3. Please use `yarn` for package manager and must commit `yarn.lock` whenever something is changed.

After cloning this repository, all you have to do is just typing `yarn`. Note that `polypoly.js` uses `vitest` for unit testing. For your intrests see `package.json`