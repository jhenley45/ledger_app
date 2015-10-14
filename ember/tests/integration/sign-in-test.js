import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Sign in', {
  beforeEach: function() {
    App = startApp();
    visit('/');
    // invalidate session before each test so navbar is predictable
    invalidateSession();
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


// Sign in route tests
test('Should redirect user to sign in route when link is clicked', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('h2:contains("Sign In")').length, 1);
  });
});

test('Sign in page should have an input box for email address', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('input#email').length, 1);
  });
});

test('Sign in page should have an input box for email address', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('input#password').length, 1);
  });
});

test('Sign in page should have a Login button', function(assert) {
  click(find('#sign-in')).then(function() {
    assert.equal(find('button:contains("Login")').length, 1);
  });
});

test('Should show an error message when the user submits an empty form', function(assert) {
  click(find('#sign-in')).then(function() {
    click(find('button:contains("Login")')).then(function() {
      assert.equal(find('div.error-message:contains("Email field cannot be empty")').length, 1);
    });
  });
});

test('Should show an error message when the user submits an empty password field', function(assert) {
  click(find('#sign-in')).then(function() {
    fillIn(find('input#email'), 'something@aol.com').then(function() {
      click(find('button:contains("Login")')).then(function() {
        assert.equal(find('div.error-message:contains("Password field cannot be empty")').length, 1);
      });
    });
  });
});

test('Should log the user in when the form is filled out', function(assert) {
  signIn().then(function() {
    assert.equal(find('li.user-menu').length, 1);
  });
});

test('Should display the username of the user in the nav bar header', function(assert) {
  signIn().then(function() {
    assert.equal(find('a.dropdown-toggle:contains("TestUser64")').length, 1);
  });
});
