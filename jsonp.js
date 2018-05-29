;(function (win, doc) {
  var TIMEOUT = 30000
  var COUNT = Date.now()
  var root = doc.body

  function jsonp(url, cb) {
    var script = doc.createElement('script')
    var id = 'jsonp_' + ++COUNT
    var param = 'callback=' + id

    var timer = setTimeout(function () {
      abort()
      cb(new Error('Timeout'))
    }, TIMEOUT)

    win[id] = function (data) {
      abort()
      cb(null, data)
    }

    function abort() {
      clearTimeout(timer)
      win[id] = function () { }
      root.removeChild(script)
    }

    script.src = url + (url.indexOf('?') ? '&' : '?') + param
    root.appendChild(script)

    return abort
  }

  win.jsonp = jsonp
})(window, document)
