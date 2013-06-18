var AZRoute = Ember.Route.extend({
  enter: function() {
    console.log("Enter route!");

    var elems:any = $(".collapse");
    elems.collapse();
  }
});

var IndexRoute = AZRoute.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});




var HarlanRoute = AZRoute.extend({
  model: function() {
    return {
      accomplishments: Accomplishment.find(),
    }
  },
});


var ProgrammingRoute = AZRoute.extend({
  model: function () {
    return { 
      projects: Project.find(),
    };
  }
});


// FIXME understand this. 
// http://stackoverflow.com/questions/15678817/why-isnt-my-ember-js-route-model-being-called
var ProjectRoute = AZRoute.extend({
  model: function () {
    return { 
      posts: [], //Project.find(),
    };
  }
});