'use strict'

const router = require('express').Router(),
      pageController = require('./controllers/page'),
      authController = require('./controllers/auth'),
      passport = require('../config/passport')

/**
 * Routes
 */
router.route('/').get(pageController.getMainpage)
                 .post(pageController.postMainpage)

router.route('/user').get(pageController.getUserList)

router.route('/user/add').get(pageController.getAddUser)
                         .post(pageController.postAddUser)

router.route('/user/:user_id').get(pageController.getUser)

router.route('/profile').get(authController.getProfile)
router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }))
router.route('/auth/google/callback').get(passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/auth/failure' }))

/**
 * 404 page notfound.
 */
router.route('*').get(pageController.notfound)

module.exports = router