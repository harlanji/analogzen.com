var ProgrammingIndexController = Ember.Controller.extend({

  toggleHighlightKeywords: function () {
    $('.skill').toggleClass('skill-on');
  },

  toggleDetails: function () {
    $('.nerd').toggleClass('nerd-on');
  }
});