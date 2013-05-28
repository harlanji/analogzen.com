var rot13 = function(s) {
  // credit: http://stackoverflow.com/questions/617647/where-is-my-one-line-implementation-of-rot13-in-javascript-going-wrong
  return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}



window.App = Ember.Application.create({
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


App.Router.map(function() {
  this.route('harlan');
  this.resource('accomplishment', {path: '/accomplishment/:accomplishment_id'}, function() {

  });
  this.route('programming');
  this.resource('project', {path: '/project/:project_id'}, function() {

  });
  this.route('lean');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});


App.CustomRestAdapter = DS.Adapter.extend({
  url: "",
  data: {},
  dataType: "jsonp",
  handleFindAllResponse: function(store, type) {
    return function(resp) {};
  },

  findAll: function(store, type) {
          //var url = type.url;
          //url = url.fmt(id);

          $.ajax({
            url: this.get('url'), 
            data: this.get('data'),
            dataType: this.get('dataType')}
          ).then(this.handleFindAllResponse(store, type));
        },

  find: function(store, type, id) {
    //console.log('FIXMEEEEE find: ' + id);
    //this.findAll(store, type);

    this.findAll(store, type);
  },
  findMany: function() {},
  createRecord: function() {},
  updateRecord: function() {},
  deleteRecord: function() {},
});






App.GDataSpreadsheetAdapter = App.CustomRestAdapter.extend({
  url: "https://spreadsheets.google.com/feeds/cells/0AlNlwgTVXeETdEozaVRfZ0Itb0lvanZFMUFFTkg4RGc/od6/public/basic",
  data: {alt: "json-in-script"},
  handleFindAllResponse: function(store, type) {
    return function(resp) {
              //console.dir(resp);

              // this could be done from headers using some mapping function.
              var colMap = {
                'A' : 'id',
                'B' : 'name',
                'C' : 'employer',
                'D' : 'summary', 
                'E' : 'timespan',
                'F' : 'skills',
                'G' : 'media',
                'H' : 'programming_description',
                'I' : 'business_description',
                'J' : 'tumblr_tag',
              };
              var coordExp = /^(([A-Z]+)([0-9]+))$/i;
              var projectMap = {}, 
                prevRow = "";

              
              resp.feed.entry.forEach(function(cell, idx) {
                var coords = cell.title.$t.match(coordExp);
                var row = coords[3],
                  col = coords[2];

                // header
                if(row == "1") {
                  return;
                }

                // FIXME what if not text?
                var value = cell.content.$t;

                if(row != prevRow) {
                  projectMap[row] = {};

                  prevRow = row;
                };



                if(!colMap.hasOwnProperty(col)) {
                  return;
                }

                var key = colMap[col];
                projectMap[row][key] = value;

                // mapping
                //switch(key) {}

                // ghetto, fix
                if(col == "I") {
                  // data is a hash of key/value pairs. If your server returns a
                  // root, simply do something like:
                  // store.load(type, id, data.person)
                  store.load(type, projectMap[row].id, projectMap[row]);
                }

              });

              //store.didUpdateAll(type);

              //console.dir(projects);

              //window.App.Project.FIXTURES = projects;
            }
          },


});






App.TumblrAdapter = App.CustomRestAdapter.extend({
  url: "http://api.tumblr.com/v2/blog/harlanji.tumblr.com/posts",
  data: {
    api_key: "emjyTZv9qgmhaxWX884sWfkA3f4Sjy4rFHX4rfRCEkCJKbr9Zz", 
    tag: "hackerfair3"
  },
  handleFindAllResponse: function(store, type) {
    return function(resp) {
      resp.response.posts.forEach(function(post, idx) {       
        // data is a hash of key/value pairs. If your server returns a
        // root, simply do something like:
        // store.load(type, id, data.person)

        var storePost = {
          id: post.id,
          post_url: post.post_url,
          date: post.date,
          caption: post.caption,
          photos: post.hasOwnProperty('photos') ? post.photos.map(function(p) {
            return p.original_size.url;
          }) : [],
        };

        store.load(type, post.id, storePost);

      });
    }
  },

});





App.Store = DS.Store.extend({
  revision: 12,
  //adapter: 'DS.RESTAdapter'
  adapter: 'DS.FixtureAdapter'
});



App.Project = DS.Model.extend({
 name: DS.attr('string'),
 employer: DS.attr('string'),
 summary: DS.attr('string'),
 timespan: DS.attr('string'),
 skills: DS.attr('string'),
 media: DS.attr('string'),
 programming_description: DS.attr('string'),
 business_description: DS.attr('string'),
 tumblr_tag: DS.attr('string'),
});



  
App.TumblrPost = DS.Model.extend({
  post_url: DS.attr('string'),
  date: DS.attr('string'),
  caption: DS.attr('string'),
  photos: DS.attr('string'),
});


App.TwitterUser = DS.Model.extend({
  defaultProfileImage: DS.attr('boolean'),
  description: DS.attr('string'),
  screenName: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  createdAt: DS.attr('date'),

  tweets: DS.hasMany('App.Tweet')
});

App.Tweet = DS.Model.extend({
  coordinates: DS.attr('point'),
  createdAt: DS.attr('date'),
  isFavorited: DS.attr('boolean'),
  retweetCount: DS.attr('number'),
  text: DS.attr('string'),
  isTruncated: DS.attr('boolean'),

  replyTo: DS.belongsTo('App.TwitterUser'),
  user: DS.belongsTo('App.TwitterUser')
});


App.TwitterUser.sync = {

};
App.Store.registerAdapter("App.TwitterUser", DS.BasicAdapter);
App.Store.registerAdapter("App.Tweet", DS.BasicAdapter);





//App.Store.registerAdapter("App.Project", App.GDataSpreadsheetAdapter);
App.Store.registerAdapter("App.Project", App.GDataSpreadsheetAdapter);
App.Store.registerAdapter("App.TumblrPost", App.TumblrAdapter);


/*
App.Store.registerAdapter("App.BlogPost", Ember.DS.RESTAdapter.extend({
  url: 'http://api.tumblr.com/v2/blog/harlanji.tumblr.com/posts', 
  data: {
    api_key: 'emjyTZv9qgmhaxWX884sWfkA3f4Sjy4rFHX4rfRCEkCJKbr9Zz',
    tag: 'hackerfair3',
  }
}));
*/


App.Project.FIXTURES2 = [
{id: 4, name: 'Analog Zen (portfolio)', template: '_ffff'},
{id: 1, name: 'DJ With Spotify', template: 'programming'},
{id: 2, name: 'Soashable', template: 'programming'},
{id: 3, name: 'Maven JavaScript Plugin', template: 'programming'},

];




App.Accomplishment = DS.Model.extend({
  name: DS.attr('string'),
});

App.Accomplishment.FIXTURES = [
{id: 1, name: 'Weight Loss'},
{id: 2, name: 'Education'},
{id: 3, name: 'Soashable (15 minutes of fame)'},
{id: 4, name: 'Professional at 15'},

];


App.ProgrammingRoute = Ember.Route.extend({
  model: function() {
    return {
      projects: App.Project.find(),
    }
  },

});


App.HarlanRoute = Ember.Route.extend({
  model: function() {
    return {
      accomplishments: App.Accomplishment.find(),
    }
  },
});

// FIXME understand this. 
// http://stackoverflow.com/questions/15678817/why-isnt-my-ember-js-route-model-being-called
App.ProjectRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    var posts = App.TumblrPost.find();

    model.set("posts", this.projectPosts(controller));
  },
  model: function() {
    return {
      posts: this.projectPosts(this.get('controller')),
    };
  },
  projectPosts: function(controller) {
    return App.TumblrPost.find();
  }
});



