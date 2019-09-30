export const emptyObject = Object.freeze({});

export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

export function toNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export function isNumber(v) {
  return typeof v === 'number' && !isNaN(v);
}

const hasOwnProperty = Object.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * total-count to totalCount
 */

const camelizeRE = /-(\w)/g;
export const camelize = cached(
  (str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
  },
);

/**
 * total-count to Total-count
 */

export const capitalize = cached(
  (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
);

/**
 *  totalCount to total-count
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached(
  (str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
  },
);




export function isDate(date) {
  if (date === null || date === undefined) { return false; }
  if (isNaN(new Date(date).getTime())) { return false; }
  if (Array.isArray(date)) { return false; } // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
}

export function toDate(date) {
  return isDate(date) ? new Date(date) : null;
}


export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}


export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}