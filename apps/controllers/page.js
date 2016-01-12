'use strict'

exports.mainpage = (req, res) => {
  let message = {
    code: 200,
    message: 'This page is running.'
  }
  res.json(message)
}

exports.test = (req, res) => {
  // let sum
  // let numbers = [1, 2, 3]
  // numbers.map((x) => {
  //   const y = x + 1;
  //   sum = x * y;
  //   console.log(sum)
  // })
  // res.json(sum)
  // [1, 2, 3].map(number => {
  //   const nextNumber = number + 1
  //   console.log(`A string containing the ${nextNumber}.`)
  // })
  res.json(req.params)
}

exports.notfound = (req, res) => {
  res.render('404')
}