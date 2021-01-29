/**
 * 获取当前时间
 * @returns 返回number
 */
export const getTimestamp = () => {
  return Date.now()
}
/**
 * 获取当前url href
 * @returns 返回string
 */
export const getLocationHref = () => {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}
/**
 * 判断数据类型
 * @returns 返回boolean
 */
export const isType = (type) => {
  return function(value) {
    return Object.prototype.toString.call(value) === '[object ' + type + ']'
  }
}
/**
 * 节流throttle
 * 调用多次、只第一次调用有效
 */
export const throttle = (fn, delay) => {
  // 定义上次触发时间
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now > last + delay) {
      last = now
      fn.apply(this, args)
    }
  }
}
/**
 * 防抖Debounce
 * 最后一次为准
 */
export const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    // 判断定时器是否存在，清除定时器
    if (timer) {
      clearTimeout(timer)
    }

    // 重新调用setTimeout
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 将地址字符串转换成对象
 * @returns 返回一个对象
 */
export function parseUrlToObj(url) {
  if (!url) return {}
  const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/)
  if (!match) return {}
  const query = match[6] || ''
  const fragment = match[8] || ''
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment // everything minus origin
  }
}
/**
 *
 * 重写对象上面的某个属性
 * ../param source 需要被重写的对象
 * ../param name 需要被重写对象的key
 * ../param replacement 以原有的函数作为参数，执行并重写原有函数
 * ../returns void
 */
export function replaceOld(source, name, replacement, isForced = false) {
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}
/**
 * 原生try函数
 * ../param fn try中执行的函数体
 * ../param errorFn 报错时执行的函数体，将err传入
 */
export function nativeTryCatch(fn, errorFn) {
  try {
    fn()
  } catch (err) {
    console.log('err', err)
    if (errorFn) {
      errorFn(err)
    }
  }
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 */
export function isInstanceOf(wat, base) {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return wat instanceof base
  } catch (_e) {
    return false
  }
}
/**
 * isError
 */
export function isError(wat) {
  switch (Object.prototype.toString.call(wat)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return isInstanceOf(wat, Error)
  }
}
