import { isType } from '@libs/utils'
/**
 * 错误类型
 */
export const ERRORTYPES = {
  UNKNOWN: 'UNKNOWN',
  UNKNOWN_FUNCTION: 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR: 'JAVASCRIPT_ERROR',
  LOG_ERROR: 'LOG_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  VUE_ERROR: 'VUE_ERROR',
  REACT_ERROR: 'REACT_ERROR',
  RESOURCE_ERROR: 'RESOURCE_ERROR',
  PROMISE_ERROR: 'PROMISE_ERROR',
  ROUTE_ERROR: 'ROUTE_ERROR'
}
/**
 * 严重等级
 */
export const SEVERITY = {
  Debug: 'Debug',
  Info: 'Info',
  Warning: 'Warning',
  Low: 'Low',
  Normal: 'Normal',
  High: 'High',
  Critical: 'Critical',
  Error: 'error',
  Else: 'else',
  fromString: function(level) {
    switch (level) {
      case 'debug':
        return SEVERITY.Debug
      case 'info':
      case 'log':
      case 'assert':
        return SEVERITY.Info
      case 'warn':
      case 'warning':
        return SEVERITY.Warning
      case SEVERITY.Low:
      case SEVERITY.Normal:
      case SEVERITY.High:
      case SEVERITY.Critical:
      case 'error':
        return SEVERITY.Error
      default:
        return SEVERITY.Else
    }
  }
}
/**
 * 严重数据类型
 */
export const VARABLETYPE = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window')
}
/**
 * 用户行为栈事件类型
 */
export const BREADCRUMBTYPES = {
  ROUTE: 'ROUTE',
  CLICK: 'UI.Click',
  CONSOLE: 'Console',
  XHR: 'Xhr',
  FETCH: 'Fetch',
  UNHANDLEDREJECTION: 'Unhandledrejection',
  VUE: 'Vue',
  REACT: 'React',
  RESOURCE: 'Resource',
  CODE_ERROR: 'Code Error',
  CUSTOMER: 'Customer',
  APP_ON_SHOW: 'App On Show',
  APP_ON_LAUNCH: 'App On Launch',
  APP_ON_HIDE: 'App On Hide',
  PAGE_ON_SHOW: 'Page On Show',
  PAGE_ON_HIDE: 'Page On Hide',
  PAGE_ON_SHARE_APP_MESSAGE: 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE: 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP: 'Page On Tab Item Tap',
  TAP: 'UI.Tap',
  TOUCHMOVE: 'UI.Touchmove'
}
/**
 * 用户行为整合类型
 */
export const BREADCRUMBCATEGORYS = {
  HTTP: 'http',
  USER: 'user',
  DEBUG: 'debug',
  EXCEPTION: 'exception',
  LIFECYCLE: 'lifecycle'
}
/**
 * 重写的事件类型
 */
export const EVENTTYPES = {
  XHR: 'xhr',
  FETCH: 'fetch',
  CONSOLE: 'console',
  DOM: 'dom',
  HISTORY: 'history',
  ERROR: 'error',
  HASHCHANGE: 'hashchange',
  UNHANDLEDREJECTION: 'unhandledrejection',
  MITO: 'mito',
  VUE: 'Vue',
  // for miniprogram
  MINI_ROUTE: 'miniRoute'
}

export const _global = window
