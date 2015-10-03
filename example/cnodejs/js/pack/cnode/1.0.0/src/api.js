// Generated by CoffeeScript 1.9.3

/**
 * api
 * @module cnode/api
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/api', ['jquery'], function($) {
    "use strict";
    var _host, exports;
    _host = 'https://cnodejs.org/api/v1';
    return exports = {
      topics: function(data) {
        if (data == null) {
          data = {};
        }
        data = $.extend({
          mdrender: false,
          limit: 10
        }, data);
        return $.get(_host + '/topics', data);
      },
      topic: function(id) {
        return $.get(_host + '/topic/' + id, {
          mdrender: false
        });
      },
      user: function(userName) {
        return $.get(_host + '/user/' + userName);
      }
    };
  });

}).call(this);
