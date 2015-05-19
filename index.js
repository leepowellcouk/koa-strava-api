"use strict";

var koa     = require('koa');
var session = require('koa-session');
var config  = require('config');
var request = require('request');
var Strava  = require('strava');
var render  = require('./lib/render');
var router  = require('./router');
var app     = koa();

app.keys = ['some secret key thing'];

app.on('error', function (err, ctx) {
  console.log();
  console.log(err.stack);
  console.dir(err);
  console.log();
});

app
  // Session Middleware
  .use(session(app))

  // Error Handler Middleware
  .use(function* (next) {
    try {
      yield next;
    }
    catch (err) {
      this.app.emit('error', err, this);
      this.status = 500;
      this.body = yield render('layouts/error');
    }
  })

  // Strava Context Middleware
  .use(function* (next) {
    if (this.session.strava) this.state.strava = new Strava(this.session.strava);
    return yield next;
  })

  // Router Middleware
  .use(router.routes())

  // Allowed Methods Middleware
  .use(router.allowedMethods());



app.use(function* (next) {
  var strava = this.state.strava;

  if (this.path !== '/stats') return yield next;

  if (strava) {
    try {
      let stats = yield strava.user.stats();
      this.body = stats;
    }
    catch (err) {
      throw err; // Rethrow
    }
  }
  else {
    this.redirect('/login');
  }
});

app.use(function* (next) {
  var strava = this.state.strava;

  if (this.path !== '/followers') return yield next;

  if (strava) {
    try {
      let followers = yield strava.user.followers();
      this.body = followers;
    }
    catch (err) {
      throw err; // Rethrow
    }
  }
  else {
    this.redirect('/login');
  }
});


app.use(function* (next) {
  var strava = this.state.strava;

  if (this.path !== '/update') return yield next;

  if (strava) {
    try {
      let data = yield strava.user.update({ weight: '80' });
      this.body = data;
    }
    catch (err) {
      throw err; // Rethrow
    }
  }
  else {
    this.redirect('/login');
  }
});

app.use(function* (next) {
  var strava = this.state.strava;

  if (this.path !== '/athlete') return yield next;

  if (strava) {
    try {
      let athlete = yield strava.athlete(580532).get();
      this.body = athlete;
    }
    catch (err) {
      throw err; // Rethrow
    }
  }
  else {
    this.redirect('/login');
  }
});



app.use(function* logout(next) {
  if (this.path !== '/logout') return yield next;
  delete this.session.strava;
  delete this.state.strava;
  this.redirect('/');
});

app.use(function* login(next) {
  if (this.path !== '/login') return yield next;

  var options = {
    client_id: config.app.id,
    redirect_uri: 'http://localhost:8080/token_exchange',
    scope: 'view_private,write'
  };

  Strava.authorize(this.res, options);
});

app.use(function* (next) {
  if (this.path !== '/token_exchange') return yield next;

  var code  = this.query.code;
  var error = this.query.error;

  if (error && error === 'access_denied') {
    this.redirect('/access_denied');
  }

  try {
    let options = { client_id: config.app.id, client_secret: config.api.secret, code: code };
    this.session.strava = yield Strava.getToken(options);
    this.redirect('/');
  }
  catch (err) {
    this.status = 500;
    this.body = 'Unable To Retrieve User';
    this.app.emit('error', err, this);
  }
});

app.listen(config.app.port, function () {
  console.log('Application listening on port %s', config.app.port);
});
