/**
 * Logger
 *
 */
const PREFIX = 'MONITOR Logger'
function Logger() {
  const _this = this
  const _global = window
  this.enabled = false
  this._console = {}
  if (_global.console) {
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach(function(level) {
      if (!(level in _global.console)) return
      _this._console[level] = _global.console[level]
    })
  }
}
Logger.prototype.disable = function() {
  this.enabled = false
}
Logger.prototype.bindOptions = function(debug) {
  this.enabled = debug ? true : false
}
Logger.prototype.enable = function() {
  this.enabled = true
}
Logger.prototype.getEnableStatus = function() {
  return this.enabled
}
Logger.prototype.log = function(...args) {
  if (!this.enabled) return
  this._console.log(`${PREFIX}[Log]:`, ...args)
}
Logger.prototype.warn = function(...args) {
  if (!this.enabled) return
  this._console.warn(`${PREFIX}[Warn]:`, ...args)
}
Logger.prototype.error = function(...args) {
  if (!this.enabled) return
  this._console.error(`${PREFIX}[Error]:`, ...args)
}

export const logger = new Logger()
