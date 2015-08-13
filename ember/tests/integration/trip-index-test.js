import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Trip index Page', {
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

test('Should display a message if there are no existing payments for a trip', function(assert) {
  assert.equal(find('div.warning-block:contains("There are currently no payments for this trip")').length, 1);
});

test('Should display a list of payments for a trip when there are payments', function(assert) {
	visit('/trips/2').then(function() {
		assert.equal(find('li.payment').length, 3);
	});
});
