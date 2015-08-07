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
  assert.equal(find('input:contains("Trip Title")').length, 1);
});


