'use strict'

 /**
  * Javascript functions (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
  * - JSON.stringify()
  * - JSON.parse()
  * - Object.assign()
  */

const helpers = {
  t: (string) => {
    let translated = `'${string}'`
    return translated
  },
  str_random: (range) => {
    var i, possible, text
    text = ''
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    i = 0
    while (i < range) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      i++
    }
    return text
  },
  date_diff: (date_one, date_two) => {
    /**
     * How to use
     * - date_diff = helpers.date_diff('01/01/2016', '01/05/2016')
     * - date_diff.[diff|ms|s|m|h|d] or date_diff.diff|ms|s|m|h|d
     */
    var diff = Date.parse( date_two ) - Date.parse( date_one )
    return isNaN( diff ) ? NaN : {
      diff : diff,
      ms   : Math.floor( diff            % 1000 ),
      s    : Math.floor( diff /     1000 %   60 ),
      m    : Math.floor( diff /    60000 %   60 ),
      h    : Math.floor( diff /  3600000 %   24 ),
      d    : Math.floor( diff / 86400000        )
    }
  }
}

module.exports = helpers