import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Sign in', {
  beforeEach: function() {
    App = startApp();
    visit('/');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

// When a user is not logged in
test('When not logged in, should have a sign in link in the navbar', function(assert) {
  assert.equal(find('#sign-in').text(), 'Sign in');
});

test('When not logged in, should have a sign up link in the navbar', function(assert) {
  assert.equal(find('#sign-up').text(), 'Sign up');
});

test('When not logged in, should not have a trips link in the navbar', function(assert) {
  assert.equal(find('a:contains("Trips")').length, 0);
});

test('When not logged in, should not have the account dropdown in the navbar', function(assert) {
  assert.equal(find('li.dropdown').length, 0);
});
