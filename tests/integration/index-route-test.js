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

test('Should display a list of trips', function(assert) {
  visit('/').then(function() {
    assert.equal(find('li').length, 3);
  });
});

test('Should display the title of each trip', function(assert) {
  visit('/').then(function() {
		var list = find('li');
		$.each(list, function(i, v) {
			assert.equal(v.innerHTML, "Trip " + (i + 1).toString());
		});
  });
});
