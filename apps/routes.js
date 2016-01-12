'use strict'

const router = require('express').Router(),
      pageController = require('./controllers/page')

/**
 * Page routes
 */
router.route('/').get(pageController.mainpage)
router.route('/user/:id').get(pageController.test)

router.route('*').get(pageController.notfound)

module.exports = router