"use strict";

var router   = require('koa-router')();
var userCtrl = require('./controllers/user');

router.get('/',        userCtrl.index);
router.get('/profile', userCtrl.profile);
router.get('/friends', userCtrl.friends);
router.get('/koms',    userCtrl.koms);

module.exports = router;
