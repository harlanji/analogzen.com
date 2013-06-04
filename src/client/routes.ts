

var IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});




var HarlanRoute = Ember.Route.extend({
  model: function() {
    return {
      accomplishments: Accomplishment.find(),
    }
  },
});


var ProgrammingRoute = Ember.Route.extend({
  model: function () {
    return { 
      projects: Project.find(),
    };
  }
});


// FIXME understand this. 
// http://stackoverflow.com/questions/15678817/why-isnt-my-ember-js-route-model-being-called
var ProjectRoute = Ember.Route.extend({
  model: function () {
    return { 
      posts: [], //Project.find(),
    };
  }
});