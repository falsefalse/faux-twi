// Models
FT.TweetModel = Backbone.Model.extend({});
FT.TweetCollection = Backbone.Collection.extend({
  model: FT.TweetModel
});

// Fixtures
FT.TWEETS = new FT.TweetCollection([
 { body: 'woot woot', timestamp: '2015-04-07T14:47:33.751Z' },
 { body: 'moot moot', timestamp: '2015-04-07T14:47:33.752Z' },
 { body: 'bar baz', timestamp: '2015-04-07T14:47:33.753Z' },
 { body: 'cut me some slack', timestamp: '2015-04-07T14:47:33.754Z' }
]);


// Views
FT.PostNew = Backbone.View.extend({
  el: '.post-new',
  initialize: function() {
    console.log('new', this.$el);
  },
  events: {
    'submit': 'addTweet'
  },
  addTweet: function(event) {
    // collect values, create a model, save it
    var form = this.$el.serializeArray().reduce(function(acc, pair) {
      acc[pair.name] = pair.value;
      return acc;
    }, {});

    form.timestamp = (new Date).toISOString();
    FT.TWEETS.add( new FT.TweetModel(form) );

    FT.app.navigate('', { trigger: true, replace: true });

    event.preventDefault();
  }
});

FT.TweetsList = Backbone.View.extend({
  el: '.tweets-list',
  initialize: function() {
    console.log('list', this);
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
  FT.app = new (Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    index: function() {
      new FT.TweetsList({ collection: FT.TWEETS });
      new FT.PostNew();
    }
  }));

  Backbone.history.start();
});

