const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const role = require('./role-mock')
const article = require('./article')
const search = require('./remote-search')
const course = require('./course')
const column = require('./column')
const school_user = require('./school_user')
const order = require('./order')
const payment = require('./payment')
const cash = require('./cash')
const renovation = require('./renovation')
const marketingGroup = require('./marketing-group')
const marketingFlashsale = require('./marketing-flashsale')
const marketingCoupon = require('./marketing-coupon')
const toolQuestion = require('./tool-question')
const toolTestpaper = require('./tool-testpaper')
const toolUserTest = require('./tool-user-test')
const toolBbs = require('./tool-bbs')
const toolBook = require('./tool-book')
const school = require('./school')
const schoolStaff = require('./school-staff')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...course,
  ...column,
  ...school_user,
  ...order,
  ...payment,
  ...cash,
  ...renovation,
  ...marketingGroup,
  ...marketingFlashsale,
  ...marketingCoupon,
  ...toolQuestion,
  ...toolTestpaper,
  ...toolUserTest,
  ...toolBbs,
  ...toolBook,
  ...school,
  ...schoolStaff
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

module.exports = {
  mocks,
  mockXHR
}
