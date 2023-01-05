const  _toString = Object.prototype.toString;

// 是否是对象，数组不满足此条件
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

// 数组
export function isPlainArray (arr) {
  return _toString.call(arr) === '[object Array]'
}

// 是否是正则表达式
export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}