import { throttle } from '@libs/utils'
import { EVENTTYPES } from '@libs/common/constant'
import { HandleEvents } from './handler'
import { addReplaceHandler } from './replace'

// 节流函数
const throttleHandle = throttle(handleActions, 500)

// 用户点击事件
window.addEventListener('click', (e) => throttleHandle(e), true)

function handleActions(e) {
  console.log(aa)
}

// handle
export function setupReplace() {
  addReplaceHandler({
    callback: (data) => HandleEvents.handleConsole(data),
    type: EVENTTYPES.CONSOLE
  })
  addReplaceHandler({
    callback: (data) => HandleEvents.handleHistory(data),
    type: EVENTTYPES.HISTORY
  })
  addReplaceHandler({
    callback: (error) => HandleEvents.handleError(error),
    type: EVENTTYPES.ERROR
  })
}

// init
setupReplace()
