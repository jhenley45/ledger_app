import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Trips Page', {
  beforeEach: function() {
    App = startApp();
    visit('/trips/1');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "Trip 1"', function(assert) {
  assert.equal(find('h3').text(), 'Trip 1');
});
