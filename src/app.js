// Generated by CoffeeScript 1.9.3

/**
 * app
 * @module mcore/app
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('mcore/app', ['jquery', 'stapes', 'mcore/route'], function($, Stapes, route) {
    "use strict";
    return Stapes.subclass({
      constructor: function($el1, options) {
        this.$el = $el1;
        if (options == null) {
          options = {};
        }
        this.options = $.extend({
          viewClass: 'mcore-app-view',
          routeChange: route.Route.changeByLocationHash
        }, options);
        this.router = new route.Route(this.options.routeChange);
        this.curView = null;
        this.onLoadViw = false;
      },
      route: function(path, viewName) {
        var self;
        self = this;
        this.router.add(path, function() {
          return self.runView(viewName, this, arguments);
        });
        return this;
      },
      runView: function(viewName, route, args) {
        if (this.onLoadViw) {
          return;
        }
        this.onLoadViw = true;
        if (this.curView) {
          if (this.curView.name === viewName) {
            this.curView.instantiate.route = route;
            this.curView.instantiate.context = route.context;
            this.curView.instantiate.run.apply(this.curView.instantiate, args);
            this.emit('runView', this.curView);
          } else {
            this.emit('destroyView', this.curView);
            this.curView.instantiate.destroy();
            this.curView = null;
          }
        }
        return requirejs([viewName], (function(_this) {
          return function(View) {
            var $el;
            $el = $("<div class='" + _this.options.viewClass + "' />");
            _this.curView = {
              name: viewName,
              instantiate: new View($el, _this)
            };
            _this.curView.instantiate.route = route;
            _this.curView.instantiate.context = route.context;
            _this.curView.instantiate.run.apply(_this.curView.instantiate, args);
            _this.curView.instantiate.$el.appendTo(_this.$el);
            _this.emit('runView', _this.curView);
            _this.curView.instantiate.afterRun();
            return _this.onLoadViw = false;
          };
        })(this));
      },
      run: function() {
        return this.router.run();
      }
    });
  });

}).call(this);
