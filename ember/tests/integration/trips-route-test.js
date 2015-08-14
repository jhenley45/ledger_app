import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Trips Page', {
  beforeEach: function() {
    App = startApp();
    visit('/trips');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "All Trips"', function(assert) {
  assert.equal(find('h3').text(), 'All Trips');
});

test('Should display a list of trips', function(assert) {
  assert.equal(find('li').length, 3);
});

test('Should display the title of each trip in a link', function(assert) {
	assert.equal(find('a:contains("Trip 1")').length, 1);
	assert.equal(find('a:contains("Trip 2")').length, 1);
	assert.equal(find('a:contains("Trip 3")').length, 1);
});

test('Should be able to go to a trip page from the index route', function(assert) {
  click('a:contains("Trip 1")').then(function() {
    assert.equal(find('h3').text(), 'Trip 1');
  });
});

test('Should be able visit a trips page', function(assert) {
  visit('/trips/1').then(function() {
    assert.equal(find('h3').text(), 'Trip 1');
  });
});

test('Should display a list of payments on the trips page after transition', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('li.payment').length, 3);
  });
});

test('Should be able to go to new trip page from index route', function(assert) {
  click(find('a:contains("Create New Trip")')).then(function() {
  	assert.equal(find('h3:contains("Create new trip")').length, 1);
  });
});
