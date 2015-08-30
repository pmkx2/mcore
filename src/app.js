// Generated by CoffeeScript 1.9.3

/**
 * app
 * @module mcore/app
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('mcore/app', ['jquery', 'stapes', 'route'], function($, Stapes, route) {
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
        if (this.curView) {
          if (this.curView.name === viewName) {
            this.curView.instantiate.route = route;
            this.curView.instantiate.context = route.context;
            this.curView.instantiate.run.apply(this.curView.instantiate, args);
            this.emit('runView', this.curView);
          } else {
            this.emit('destroyView', this.curView);
            this.curView.instantiate.destroy();
          }
        }
        return requirejs([viewName], function(View) {
          var $el;
          $el = $("<div class='" + this.options.viewClass + "' />");
          this.curView = {
            name: viewName,
            instantiate: new View($el, this)
          };
          this.curView.instantiate.route = route;
          this.curView.instantiate.context = route.context;
          this.curView.instantiate.run.apply(this.curView.instantiate, args);
          this.curView.instantiate.$el.appendTo(this.$el);
          this.emit('runView', this.curView);
          return this.curView.instantiate.afterRun();
        });
      },
      run: function() {
        return this.router.run();
      }
    });
  });

}).call(this);
