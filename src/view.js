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
        this.init();
        return this.watch();
      },
      clone: function(value) {
        return util.clone(value);
      },
      asyncSet: function(key, promise) {
        return promise.then((function(_this) {
          return function(val) {
            _this.set(key, val);
            return val;
          };
        })(this));
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
      bind: function(data) {
        if (data == null) {
          data = {};
        }
        return Template.bind(data, this);
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
       * 缓存，基本内存，刷新页面失效
       * @author vfasky <vfasky@gmail.com>
       *
       */
      memoryCache: function(key) {
        var cache, proxy;
        proxy = util.promiseCacheMemoryproxy;
        cache = {
          has: function(promise) {
            return util.promiseCache(key, promise, {
              proxy: proxy
            });
          },
          remove: function() {
            return proxy.remove(key);
          }
        };
        return cache;
      },

      /**
       * 缓存，基本 localStorage
       * @author vfasky <vfasky@gmail.com>
       *
       */
      localCache: function(key) {
        var cache, proxy;
        proxy = util.promiseCacheLocalProxy;
        cache = {
          has: function(promise, time) {
            if (time == null) {
              time = Infinity;
            }
            return util.promiseCache(key, promise, {
              proxy: proxy,
              time: time
            });
          },
          remove: function() {
            return proxy.remove(key);
          }
        };
        return cache;
      },

      /**
       * 缓存，基本当前 view 的生命周期
       * @author vfasky <vfasky@gmail.com>
       *
       */
      sessionCach: function(key) {
        var cache, proxy;
        proxy = this.promiseCacheSessionProxy();
        cache = {
          has: function(promise) {
            return util.promiseCache(key, promise, {
              proxy: proxy
            });
          },
          remove: function() {
            return proxy.remove(key);
          }
        };
        return cache;
      },
      promiseCacheSessionProxy: function() {
        var proxy;
        proxy = {
          set: (function(_this) {
            return function(key, value) {
              return _this._cacheMap[key] = value;
            };
          })(this),
          get: (function(_this) {
            return function(key) {
              return _this._cacheMap[key] || null;
            };
          })(this)
        };
        return proxy;
      },
      back: function() {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '#';
        }
        return false;
      },
      beforeInit: function() {},
      init: function() {},
      run: function() {},
      afterRun: function() {},
      watch: function() {}
    });
  });

}).call(this);
