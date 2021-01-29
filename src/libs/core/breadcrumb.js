import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '@libs/common/constant'
import { logger } from '@libs/core/logger'
/**
 * Breadcrumb
 * 信息容器
 */
function Breadcrumb() {
  this.maxBreadcrumbs = 10
  this.beforePushBreadcrumb = null
  this.stack = []
  return this
}
Breadcrumb.prototype.push = function(data) {
  const _this = this
  let result = data
  if (typeof this.beforePushBreadcrumb === 'function') {
    result = this.beforePushBreadcrumb(_this, data)
  }
  if (!result) return
  this.immediatePush(result)
}
Breadcrumb.prototype.immediatePush = function(data) {
  data.time = Date.now()
  if (this.stack.length >= this.maxBreadcrumbs) {
    this.shift()
  }
  this.stack.push(data)
  logger.log(this.stack)
}
Breadcrumb.prototype.shift = function() {
  return this.stack.shift() !== undefined
}
Breadcrumb.prototype.clear = function() {
  this.stack = []
}
Breadcrumb.prototype.getStack = function() {
  return this.stack
}
Breadcrumb.prototype.getCategory = function(type) {
  switch (type) {
    case BREADCRUMBTYPES.XHR:
    case BREADCRUMBTYPES.FETCH:
      return BREADCRUMBCATEGORYS.HTTP
    case BREADCRUMBTYPES.CLICK:
    case BREADCRUMBTYPES.ROUTE:
    case BREADCRUMBTYPES.TAP:
    case BREADCRUMBTYPES.TOUCHMOVE:
      return BREADCRUMBCATEGORYS.USER
    case BREADCRUMBTYPES.CUSTOMER:
    case BREADCRUMBTYPES.CONSOLE:
      return BREADCRUMBCATEGORYS.DEBUG
    case BREADCRUMBTYPES.APP_ON_LAUNCH:
    case BREADCRUMBTYPES.APP_ON_SHOW:
    case BREADCRUMBTYPES.APP_ON_HIDE:
    case BREADCRUMBTYPES.PAGE_ON_SHOW:
    case BREADCRUMBTYPES.PAGE_ON_HIDE:
    case BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE:
    case BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE:
    case BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP:
      return BREADCRUMBCATEGORYS.LIFECYCLE
    case BREADCRUMBTYPES.UNHANDLEDREJECTION:
    case BREADCRUMBTYPES.CODE_ERROR:
    case BREADCRUMBTYPES.RESOURCE:
    case BREADCRUMBTYPES.VUE:
    case BREADCRUMBTYPES.REACT:
    default:
      return BREADCRUMBCATEGORYS.EXCEPTION
  }
}
Breadcrumb.prototype.bindOptions = function(options = {}) {
  this.maxBreadcrumbs = options.maxBreadcrumbs || 10
  this.beforePushBreadcrumb = options.beforePushBreadcrumb || null
}
export const breadcrumb = new Breadcrumb()
