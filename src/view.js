// Generated by CoffeeScript 1.9.3

/**
 * View
 * @module mcore/view
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('mcore/view', ['jquery', 'mcore/template', 'stapes', 'mcore/util'], function($, Template, Stapes, util) {
    "use strict";
    var $body, $win, _isIOS, _isWeixinBrowser;
    $win = $(window);
    $body = $('body');
    _isWeixinBrowser = /MicroMessenger/i.test(window.navigator.userAgent);
    _isIOS = /iphone|ipad/gi.test(window.navigator.appVersion);
    return Stapes.subclass({
      constructor: function($el, app) {
        this.$el = $el;
        this.app = app;
        this.$win = $win;
        this.$body = $body;
        this.util = util;
        this._cacheMap = {};
        this.isWeixinBrowser = _isWeixinBrowser;
        this.isIOS = _isIOS;
        this.tpl = false;
        this.beforeInit();
        return this.init();
      },
      clone: function(value) {
        return util.clone(value);
      },
      setTitle: function(title) {
        var $iframe;
        this.title = title;
        if (document.title === this.title) {
          return;
        }
        document.title = this.title;
        if (this.isWeixinBrowser && this.isIOS) {
          $iframe = $('<iframe src="/favicon.ico"></iframe>');
          return $iframe.one('load', function() {
            return setTimeout(function() {
              return $iframe.remove();
            }, 0);
          }).appendTo(this.$body);
        }
      },
      render: function(uri, data) {
        if (data == null) {
          data = {};
        }
        return Template.render(uri, data, this);
      },
      renderString: function(html, data) {
        if (data == null) {
          data = {};
        }
        return Template.renderString(html, data, this);
      },
      when: function() {
        return $.when.apply(this, arguments);
      },
      destroy: function() {
        if (this.tpl) {
          this.tpl.destroy();
        }
        return this.$el.remove();
      },

      /**
       * 缓存 promise
       * @param {String} key
       * @param {Promise} promise
       * @param {Object} options
       * @param {String} [options.storage = session] 存放类型
       *   session: 更换 view 失效，
       *   memory: 刷新页面 失败
       *   localStorage: 放在 localStorage
       * @param {Number} options.time 有效时间，只对 localStorage 有效
       * @author vfasky <vfasky@gmail.com>
       *
       */
      cache: function(key, promise, options) {
        var proxyMap;
        if (options == null) {
          options = {};
        }
        options = $.extend({
          storage: 'session',
          time: Infinity
        }, options);
        proxyMap = {
          session: this.promiseCacheSessionProxy,
          memory: util.promiseCacheMemoryproxy,
          localStorage: util.promiseCacheLocalProxy
        };
        options.proxy = proxyMap[options.time] || this.promiseCacheSessionProxy;
        return util.promise.cache(key, promise, options);
      },
      promiseCacheSessionProxy: function() {
        var proxy;
        proxy = {
          set: function(key, value) {
            return this._cacheMap[key] = value;
          },
          get: function(key) {
            return this._cacheMap[key] || null;
          }
        };
        return proxy;
      },
      beforeInit: function() {},
      init: function() {},
      run: function() {},
      afterRun: function() {},
      watch: function() {}
    });
  });

}).call(this);
