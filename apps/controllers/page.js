'use strict'

exports.mainpage = (req, res) => {
  let message = {
    code: 200,
    message: 'This page is running.'
  }
  res.json(message)
}

exports.notfound = (req, res) => {
  let message = {
    code: 404,
    message: 'Page notfound'
  }
  res.json(message)
}