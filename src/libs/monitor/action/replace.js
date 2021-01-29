import { getLocationHref, nativeTryCatch, replaceOld } from '@libs/utils'
import { EVENTTYPES, _global } from '@libs/common/constant'
import { logger } from '@libs/core'

const replaceFlag = {}
const handlers = {}
let lastHref = getLocationHref()

export function addReplaceHandler(handler) {
  subscribeEvent(handler)
  replace(handler.type)
}
/**
 * 订阅事件
 */
export function subscribeEvent(handler) {
  if (!handler) return
  if (getFlag(handler.type)) return
  setFlag(handler.type, true)
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type].push(handler.callback)
}
export function setFlag(replaceType, isSet) {
  if (replaceFlag[replaceType]) return
  replaceFlag[replaceType] = isSet
}
export function getFlag(replaceType) {
  return replaceFlag[replaceType] ? true : false
}
/**
 * 装饰者模式
 * 替换原有方法
 */
function replace(type) {
  switch (type) {
    case EVENTTYPES.HISTORY:
      historyReplace()
      break
    case EVENTTYPES.ERROR:
      listenError()
      break
  }
}
// history
function historyReplace() {
  if (!supportsHistory()) return
  const oldOnpopstate = _global.onpopstate
  const _this = this
  _global.onpopstate = function(_this, ...args) {
    const to = getLocationHref()
    const from = lastHref
    triggerHandlers(EVENTTYPES.HISTORY, {
      from,
      to
    })
    oldOnpopstate && oldOnpopstate.apply(_this, args)
  }
  function historyReplaceFn(originalHistoryFn) {
    const _this = this
    return function(_this, ...args) {
      const url = args.length > 2 ? args[2] : undefined
      if (url) {
        const from = lastHref
        const to = String(url)
        lastHref = to
        triggerHandlers(EVENTTYPES.HISTORY, {
          from,
          to
        })
      }
      return originalHistoryFn.apply(this, args)
    }
  }
  replaceOld(_global.history, 'pushState', historyReplaceFn)
  replaceOld(_global.history, 'replaceState', historyReplaceFn)
}
function supportsHistory() {
  // NOTE: in Chrome App environment, touching history.pushState, *even inside
  //       a try/catch block*, will cause Chrome to output an error to console.error
  // borrowed from: https://github.com/angular/angular.js/pull/13945/files
  const chrome = _global.chrome
  // tslint:disable-next-line:no-unsafe-any
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime
  const hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState

  return !isChromePackagedApp && hasHistoryApi
}
// error
function listenError() {
  on(_global, 'error', (e) => triggerHandlers(EVENTTYPES.ERROR, e), true)
}

// common
function triggerHandlers(type, data) {
  if (!type || !handlers[type]) return
  handlers[type].forEach((callback) => {
    nativeTryCatch(
      () => {
        callback(data)
      },
      (e) => {
        logger.error(
          `重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`
        )
      }
    )
  })
}
/**
 * 添加事件监听器
 *
 * ../export
 * ../param {{ addEventListener: Function }} target
 * ../param {keyof TotalEventName} eventName
 * ../param {Function} handler
 * ../param {(boolean | Object)} opitons
 * ../returns
 */
function on(target, eventName, handler, opitons) {
  target.addEventListener(eventName, handler, opitons)
}
/**
 * 需要获取函数名，匿名则返回<anonymous>
 * ../param {unknown} fn 需要获取函数名的函数本体
 * ../returns 返回传入的函数的函数名
 */
export function getFunctionName(fn) {
  if (!fn || typeof fn !== 'function') {
    return defaultFunctionName
  }
  return fn.name || defaultFunctionName
}
