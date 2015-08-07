import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - New Trip Page', {
  beforeEach: function() {
    App = startApp();
    visit('/trips/new');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "Create new trip"', function(assert) {
  assert.equal(find('h3:contains("Create new trip")').length, 1);
});

test('Should have an input for the Title field', function(assert) {
  assert.equal(find('input#trip-title').length, 1);
});

test('Should have a submit button', function(assert) {
  assert.equal(find('button:contains("Submit")').length, 1);
});

test('Should show an error message when the user submits the form with an empty title', function(assert) {
  click(find('button:contains("Submit")')).then(function() {
    assert.equal(find('div.error-message:contains("Title cannot be empty")').length, 1);
  });
});


