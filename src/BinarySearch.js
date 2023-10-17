/**
 * Create index finder which finds the position of the maximum element less or equal than given one.
 * @param {(a: T, b: T) => number} comp Should returns `v` as following:
 *
 * - if `a` < `b` then `v` < 0
 * - if `a` > `b` then `v` > 0
 * - otherwise `v` = 0
 * @returns {(list: T[], target: T) => number}
 */
export function createMaxLessOrEqualFinder(comp) {
  /**
   * @param {T[]} list
   * @param {T} target
   * @returns {number} The index of maximum in `list` less or equal than `target`
   */
  return (list, target) => {
    let l = 0
    let r = list.length - 1

    while (l < r) {
      const m = Math.ceil((l + r) / 2)

      if (comp(list[m], target) > 0) {
        r = m - 1
      } else {
        l = m
      }
    }

    if (comp(list[r], target) > 0) return -1

    return r
  }
}
