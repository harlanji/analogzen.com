var ProgrammingIndexController = Ember.Controller.extend({

  toggleHighlightKeywords: function () {
    $('.skill').toggleClass('skill-on');
  },

  toggleDetails: function () {
    $('.nerd').toggleClass('nerd-on');
  }
});

declare var _gaq:any;

var ApplicationController_currentPathChanged:any = function () {
  var page;
  var e:any = Ember;

  console.log("currentPathChanged");

  // window.location gets updated later in the current run loop, so we will
  // wait until the next run loop to inspect its value and make the call
  // to track the page view
  e.run.next(function() {
    // Track the page in Google Analytics
    if (!e.isNone(_gaq)) {
      // Assume that if there is a hash component to the url then we are using
      // the hash location strategy. Otherwise, we'll assume the history
      // strategy.
      page = window.location.hash.length > 0 ?
             window.location.hash.substring(1) :
             window.location.pathname;

      // You need your Google Analytics code already loaded for _ga to be initialized
      _gaq.push(['_trackPageview', page]);
    }
  });
};

var ApplicationController = Ember.Controller.extend({
  routeChanged: (function() {
    /*
    if (!window._gaq) {
      return;
    }
    return Em.run.next(function() {
      var page;
      page = window.location.hash.length > 0 ? window.location.hash.substring(1) : window.location.pathname;
      return _gaq.push(['_trackPageview', page]);
    });
  */
  }),

  currentPathChanged: ApplicationController_currentPathChanged.observes('currentPath')

});
