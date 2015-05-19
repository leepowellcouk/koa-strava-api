"use strict";

var views  = require('co-views');
var render = views('views', { map: { swig: 'swig' }, default: 'swig' });

module.exports = (view, locals) => {
  return new Promise((resolve, reject) => {
    render(view, locals)(function (err, html) {
      if (err) return reject(err);
      resolve(html);
    });
  });
};
