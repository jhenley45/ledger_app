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
    assert.equal(find('p.error-message:contains("Title field cannot be empty")').length, 1);
  });
});

test('Should have a "Back" link', function(assert) {
  assert.equal(find('a:contains("Back")').length, 1);
});

test('Should not create a new trip unless the user clicks submit', function(assert) {
  click(find('a:contains("Back")')).then(function() {
    assert.equal(find('li').length, 3);
  });
});

test('Should transition the user to the new trips route after successfully creating a new trip.', function(assert) {
  fillIn(find('input#trip-title'), 'Trip 4').then(function() {
    click(find('button:contains("Submit")')).then(function() {
      assert.equal(find('h3').text(), 'Trip 4');
    });
  });
});

// Not quite working, need to figure out how to work with Ember.run.later
// test('Should display an success message when the user successfully creates a new trip.', function(assert) {
//   fillIn(find('input#trip-title'), 'Trip 4').then(function() {
//     click(find('button:contains("Submit")')).then(function() {
//       assert.equal(find('div.flash-success').length, 1);
//     });
//   });
// });

