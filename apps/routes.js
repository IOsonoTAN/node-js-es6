'use strict'

const router = require('express').Router(),
      pageController = require('./controllers/page')

/**
 * Routes
 */
router.route('/').get(pageController.getMainpage)
                 .post(pageController.postMainpage)

router.route('/user').get(pageController.getUserList)

router.route('/user/add').get(pageController.getAddUser)
                         .post(pageController.postAddUser)

router.route('/user/:user_id').get(pageController.getUser)

/**
 * 404 page notfound.
 */
router.route('*').get(pageController.notfound)

module.exports = router