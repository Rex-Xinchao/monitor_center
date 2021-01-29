import Vue from 'vue'
import { getLocationHref, getTimestamp } from '@libs/utils'
import { ERRORTYPES, SEVERITY, BREADCRUMBTYPES, VARABLETYPE } from '@libs/common/constant'
import { breadcrumb } from '@libs/core'

const hasConsole = typeof console !== 'undefined'

// handle
function handleVueError(err, vm, info, level, breadcrumbLevel, Vue) {
  const version = Vue ? Vue.version : null
  let data = {
    type: ERRORTYPES.VUE_ERROR,
    message: `${err.message}(${info})`,
    level,
    url: getLocationHref(),
    name: err.name,
    stack: err.stack || [],
    time: getTimestamp()
  }
  if (VARABLETYPE.isString(version)) {
    const bigVersion = Number(version.split('.')[0])
    switch (bigVersion) {
      case 2:
        data = { ...data, ...vue2VmHandler(vm) }
        break
      case 3:
        data = { ...data, ...vue3VmHandler(vm) }
        break
      default:
        return
    }
  }
  breadcrumb.push({
    type: BREADCRUMBTYPES.VUE,
    category: breadcrumb.getCategory(BREADCRUMBTYPES.VUE),
    data,
    level: breadcrumbLevel
  })
  console.log(data)
}
function vue2VmHandler(vm) {
  var componentName = ''
  if (vm.$root === vm) {
    componentName = 'root'
  } else {
    var name_1 = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
    componentName =
      (name_1 ? 'component <' + name_1 + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
  }
  return {
    componentName: componentName,
    propsData: vm.$options && vm.$options.propsData
  }
}
function vue3VmHandler(vm) {
  var componentName = ''
  if (vm.$root === vm) {
    componentName = 'root'
  } else {
    console.log(vm.$options)
    var name_2 = vm.$options && vm.$options.name
    componentName = name_2 ? 'component <' + name_2 + '>' : 'anonymous component'
  }
  return {
    componentName: componentName,
    propsData: vm.$props
  }
}

// install
Vue.config.errorHandler = (err, vm, info) => {
  handleVueError.apply(null, [err, vm, info, SEVERITY.Normal, SEVERITY.Error, Vue])
  if (hasConsole && !Vue.config.silent) {
    console.error(`Error in ${info}:" ${err.toString()} "`, vm)
    console.error(err)
  }
}
