import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Sign up', {
  beforeEach: function() {
    App = startApp();
    visit('/');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a sign up link in the navbar', function(assert) {
  assert.equal(find('#sign-up').text(), 'Sign up');
});
