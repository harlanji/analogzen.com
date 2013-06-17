var ProgrammingIndexController = Ember.Controller.extend({

  toggleHighlightKeywords: function () {
    $('.skill').toggleClass('skill-on');
  },

  toggleDetails: function () {
    $('.nerd').toggleClass('nerd-on');
  }
});

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
  })
});
