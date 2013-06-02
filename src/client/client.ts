/// <reference path="../../d.ts/DefinitelyTyped/jquery/jquery.d.ts" />


/// <reference path="../../d.ts/ember.d.ts" />
/// <reference path="../../d.ts/ember-data.d.ts" />


/// <reference path="models.ts" />
/// <reference path="fixtures.ts" />
/// <reference path="routes.ts" />

var rot13 = function(s) {
  // credit: http://stackoverflow.com/questions/617647/where-is-my-one-line-implementation-of-rot13-in-javascript-going-wrong
  return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}






var Store = DS.Store.extend({
  revision: 12,
  //adapter: 'DS.RESTAdapter'
  adapter: 'DS.FixtureAdapter'
});



var App = Ember.Application.create({
  title: 'Analog Zen',
  author: {
    name: 'Harlan Iverson',
    // to avoid harvesters. does not stop smart harvesters that look at the DOM text.
    email: rot13('uneyna@nanybtmra.pbz')
  },
  tumblr: {
    clientKey: 'emjyTZv9qgmhaxWX884sWfkA3f4Sjy4rFHX4rfRCEkCJKbr9Zz',
  },
});


App.reopen({

	// data / models
	Store: Store,
	Tweet: Tweet,
	TwitterUser: TwitterUser,
	TumblrPost: TumblrPost,
	Project: Project,
	Accomplishment: Accomplishment,

	// routes
	IndexRoute: IndexRoute,
	HarlanRoute: HarlanRoute,
	ProjectRoute: ProjectRoute,
});


App.Router.map(function() {
  this.resource('harlan', function() {
    this.route('music');
  });
  

  this.resource('accomplishment', {path: 'accomplishment/:accomplishment_id'}, function() {

  });
  this.route('programming');
  this.resource('project', {path: '/project/:project_id'}, function() {
    this.route('analogzen');
    this.route('dj_with_spotify');
    this.route('soashable');
  });
  this.route('lean');
});









/*
App.Store.registerAdapter("App.BlogPost", Ember.DS.RESTAdapter.extend({
  url: 'http://api.tumblr.com/v2/blog/harlanji.tumblr.com/posts', 
  data: {
    api_key: 'emjyTZv9qgmhaxWX884sWfkA3f4Sjy4rFHX4rfRCEkCJKbr9Zz',
    tag: 'hackerfair3',
  }
}));
*/








