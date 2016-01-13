'use strict'

const helpers = {
  t: (string) => {
    let translated = `'${string}'`
    return translated
  },
  rand: (range) => {
    var i, possible, text
    text = ''
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    i = 0
    while (i < range) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      i++
    }
    return text
  }
}

module.exports = helpers