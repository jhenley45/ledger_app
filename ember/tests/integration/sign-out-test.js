import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Sign out', {
  beforeEach: function() {
    App = startApp();

    invalidateSession().then(function() {
        visit('/').then(function() {
        click(find('#sign-in')).then(function() {
          fillIn(find('input#email'), 'something@aol.com');
          fillIn(find('input#password'), 'mycoolpass1').then(function() {
            click(find('button:contains("Login")'));
          });
        });
      });
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('When logged in, should have a sign out link nested under the dropdown in the navbar', function(assert) {
  click(find('a.dropdown-toggle:contains("TestUser64")')).then(function() {
    assert.equal(find('ul.dropdown-menu:contains("Sign out")').length, 1);
  });
});

test('Should invalidate the user session when the user clicks to Sign out', function(assert) {
  click(find('a.dropdown-toggle:contains("TestUser64")')).then(function() {
    click(find('a:contains("Sign out")')).then(function() {
      assert.equal(find('#sign-in').length, 1);
    });
  });
});
