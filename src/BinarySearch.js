/**
 * Create index finder which finds the position of element exatly same to given.
 * @param {(a: T, b: T) => number} comp Should returns `v` as following:
 *
 * - if `a` < `b` then `v` < 0
 * - if `a` > `b` then `v` > 0
 * - otherwise `v` = 0
 * @returns {(list: T[], target: T) => number} Find the index of `target` from `list`
 */
export function createExactFinder(comp) {
  /**
   * @param {T[]} list
   * @param {T} target
   * @returns {number} The index of given elements. If there is no such, returns -1.
   */
  return (list, target) => {
    let l = 0
    let r = list.length - 1

    while (l <= r) {
      const m = Math.ceil((l + r) / 2)
      const c = comp(list[m], target)

      if (c === 0) return m

      if (c > 0) {
        r = m - 1
      } else {
        l = m + 1
      }
    }

    return -1
  }
}

/**
 * Create index finder which finds the position of the maximum element less than given one.
 * @param {(a: T, b: T) => number} comp Should returns `v` as following:
 *
 * - if `a` < `b` then `v` < 0
 * - if `a` > `b` then `v` > 0
 * - otherwise `v` = 0
 * @returns {(list: T[], target: T) => number}
 */
export function createMaxLessFinder(comp) {
  /**
   * @param {T[]} list
   * @param {T} target
   * @returns {number} The index of maximum in `list` less than `target`
   */
  return (list, target) => {
    let l = 0
    let r = list.length - 1

    while (l < r) {
      const m = Math.ceil((l + r) / 2)

      if (comp(list[m], target) >= 0) {
        r = m - 1
      } else {
        l = m
      }
    }

    if (comp(list[r], target) >= 0) return -1

    return r
  }
}

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

/**
 * Create index finder which finds the position of the minimum element greater than given one.
 * @param {(a: T, b: T) => number} comp Should returns `v` as following:
 *
 * - if `a` < `b` then `v` < 0
 * - if `a` > `b` then `v` > 0
 * - otherwise `v` = 0
 * @returns {(list: T[], target: T) => number}
 */
export function createMinGreaterFinder(comp) {
  /**
   * @param {T[]} list
   * @param {T} target
   * @returns {number} The index of minimum in `list` greater than `target`
   */
  return (list, target) => {
    let l = 0
    let r = list.length - 1

    while (l < r) {
      const m = Math.floor((l + r) / 2)

      if (comp(list[m], target) <= 0) {
        l = m + 1
      } else {
        r = m
      }
    }

    if (comp(list[r], target) <= 0) return -1

    return r
  }
}

/**
 * Create index finder which finds the position of the minimum element greater or equal than given one.
 * @param {(a: T, b: T) => number} comp Should returns `v` as following:
 *
 * - if `a` < `b` then `v` < 0
 * - if `a` > `b` then `v` > 0
 * - otherwise `v` = 0
 * @returns {(list: T[], target: T) => number}
 */
export function createMinGreaterOrEqualFinder(comp) {
  /**
   * @param {T[]} list
   * @param {T} target
   * @returns {number} The index of minimum in `list` greater or equal than `target`
   */
  return (list, target) => {
    let l = 0
    let r = list.length - 1

    while (l < r) {
      const m = Math.floor((l + r) / 2)

      if (comp(list[m], target) < 0) {
        l = m + 1
      } else {
        r = m
      }
    }

    if (comp(list[r], target) < 0) return -1

    return r
  }
}
