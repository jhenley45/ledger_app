// http://stackoverflow.com/questions/25298436/ember-simple-auth-custom-authenticator

import Ember from "ember";
import Session from "simple-auth/session";

var CustomSession = Session.extend({
  // user_id is returned from authentication payload, along with token.
  // Once we get the user_id, send GET request to get that individual user
  // and set as currentUser prop on simple-auth session object,
  // which is injected into routes, controllers, and templates.
  currentUser: function() {
    var userId = this.get('secure.user_id');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('secure.user_id')
});

export default {
  name: "customSession",
  before: "simple-auth",
  initialize: function(container) {
    container.register('session:customSession', CustomSession);
  }
};
