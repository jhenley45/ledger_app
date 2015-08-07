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

test('Should display the title of each trip in a link', function(assert) {
  visit('/').then(function() {
		assert.equal(find('a:contains("Trip 1")').length, 1);
		assert.equal(find('a:contains("Trip 2")').length, 1);
		assert.equal(find('a:contains("Trip 3")').length, 1);
  });
});

test('Should be able to go to a trip page from the index route', function(assert) {
  visit('/').then(function() {
    click('a:contains("Trip 1")').then(function() {
      assert.equal(find('h3').text(), 'Trip 1');
    });
  });
});

test('Should be able visit a speaker page', function(assert) {
  visit('/trips/1').then(function() {
    assert.equal(find('h3').text(), 'Trip 1');
  });
});

test('Should be able to go to new trip page from index route', function(assert) {
  visit('/').then(function() {
    click(find('a:contains("Create New Trip")')).then(function() {
    	assert.equal(find('h3:contains("Create new trip")').length, 1);
    });
  });
});
