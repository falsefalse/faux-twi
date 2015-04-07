// Models
FT.TweetModel = Backbone.Model.extend({});
FT.TweetCollection = Backbone.Collection.extend({
  model: FT.TweetModel
});

// Routes
FT.App = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function() {
    var allTweets = new FT.TweetCollection([
     { body: 'some1', timestamp: '2015-04-07T14:47:33.751Z' },
     { body: 'some2', timestamp: '2015-04-07T14:47:33.752Z' },
     { body: 'some3', timestamp: '2015-04-07T14:47:33.753Z' },
     { body: 'some4', timestamp: '2015-04-07T14:47:33.754Z' }
    ]);

    new FT.TweetsList({ collection: allTweets });
  }
});

// Views
FT.PostNew = Backbone.View.extend({
  el: '.post-new',
  initialize: function() {
    console.log(this.$el);
  },
  events: {
    'submit': 'addTweet'
  },
  addTweet: function(event) {
    // collect values, create a model, save it
    var values = this.$el.serializeArray().reduce(function(acc, pair) {
      acc[pair.name] = pair.value;
      return acc;
    }, {});

    values.timestamp = (new Date).toISOString();
    var newTweet = new FT.TweetModel(values);
    event.preventDefault();
  }
});

FT.TweetsList = Backbone.View.extend({
  el: '.tweets-list',
  initialize: function() {
    console.log(this);
    this.template = _.template( $('#tpl-tweet-item').text() );
    this.render();
  },
  render: function() {
    var html = this.collection.reduce(function(acc, model) {
      acc += this.template( model.toJSON() );
      return acc;
    }, '', this);

    this.$el.html( html );
  }
});

$(function() {
  var app = new FT.App();
  Backbone.history.start();
});


