



var GDataRecord = Ember.Object.extend({});

GDataRecord.reopenClass({
  url: "https://spreadsheets.google.com/feeds/cells/0AlNlwgTVXeETdEozaVRfZ0Itb0lvanZFMUFFTkg4RGc/od6/public/basic",
  data: {alt: "json-in-script"},
  dataType: "jsonp",

  // this could be done from headers using some mapping function.
  colMap: {
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
    },

  findAll: function() {

    var colMap = this.colMap;

    return $.ajax({
      url: this.url, 
      data: this.data,
      dataType: this.dataType
    }).then(function(resp) {
      var coordExp = /^(([A-Z]+)([0-9]+))$/i;
      var projectMap = {}, 
        prevRow = "";


      var records = [];      
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
          records.push( GDataRecord.create(projectMap[row]) );
        }

      });

      return records;
    });
  },

});






var Project = DS.Model.extend({
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


  
var TumblrPost = Ember.Object.extend({});


TumblrPost.reopenClass({
  url: "http://api.tumblr.com/v2/blog/harlanji.tumblr.com/posts",
  data: {
    api_key: "emjyTZv9qgmhaxWX884sWfkA3f4Sjy4rFHX4rfRCEkCJKbr9Zz", 
    tag: "hackerfair3"
  },

  findAll: function() {
    return $.ajax({
      url: this.url, 
      data: this.data,
      dataType: this.dataType
    }).then(function(resp) {
      var posts = [];
      resp.response.posts.forEach(function(post, idx) {       
        // data is a hash of key/value pairs. If your server returns a
        // root, simply do something like:
        // store.load(type, id, data.person)

        var storePost = TumblrPost.create({
          id: post.id,
          post_url: post.post_url,
          date: post.date,
          caption: post.caption,
          photos: post.hasOwnProperty('photos') ? post.photos.map(function(p) {
              return p.original_size.url;
            }) : [],

        });

        posts.push(storePost);
      });
      return posts;
    });
  },
});

var TwitterUser = DS.Model.extend({
  defaultProfileImage: DS.attr('boolean'),
  description: DS.attr('string'),
  screenName: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  createdAt: DS.attr('date'),

  tweets: DS.hasMany('App.Tweet')
});

var Tweet = DS.Model.extend({
  coordinates: DS.attr('point'),
  createdAt: DS.attr('date'),
  isFavorited: DS.attr('boolean'),
  retweetCount: DS.attr('number'),
  text: DS.attr('string'),
  isTruncated: DS.attr('boolean'),

  replyTo: DS.belongsTo('App.TwitterUser'),
  user: DS.belongsTo('App.TwitterUser')
});




var Accomplishment = DS.Model.extend({
  name: DS.attr('string'),
});


Accomplishment.FIXTURES = [
{id: 1, name: 'Weight Loss'},
{id: 2, name: 'Education'},
{id: 3, name: 'Soashable (15 minutes of fame)'},
{id: 4, name: 'Professional at 15'},
];

