"use strict";

var render = require('../lib/render');

var ctrl = {};

ctrl.index = function* (next) {
  var user = false;
  var strava = this.state.strava;
  if (this.path !== '/') return yield next;
  if (strava) user = yield strava.user.get();
  this.body = yield render('layouts/homepage', { user: user });
};

ctrl.profile = function* (next) {
  var strava = this.state.strava;
  if (this.path !== '/profile') return yield next;
  if (strava) this.body = yield strava.user.get(true).then(user => render('layouts/profile', { user: user }));
  else this.redirect('/login');
};

ctrl.friends = function* (next) {
  var strava = this.state.strava;
  if (this.path !== '/friends') return yield next;
  if (strava) this.body = yield strava.user.friends().then(friends => render('layouts/friends', { friends: friends }));
  else this.redirect('/login');
};

ctrl.koms = function* (next) {
  var strava = this.state.strava;
  if (this.path !== '/koms') return yield next;
  if (strava) this.body = yield strava.user.koms();
  else this.redirect('/login');
}

module.exports = ctrl;
