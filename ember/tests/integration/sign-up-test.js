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

test('Sign up link should take user to sign up route', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('h2').text(), 'Create Account');
  });
});

test('Sign up page should have an input box for email address', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign up page should have an input box for password', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign up page should have an input box for repeat password', function(assert) {
  click(find('#sign-up')).then(function() {
    assert.equal(find('input#repeat-password').length, 1);
  });
});
