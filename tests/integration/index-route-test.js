import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Index Page', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "All Trips"', function(assert) {
  visit('/').then(function() {
    assert.equal(find('h3').text(), 'All Trips');
  });
});
