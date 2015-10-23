import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Settle Trip', {
  beforeEach: function() {
    App = startApp();
    signIn().then(function() {
      visit('/trips/2');
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a "Settle Trip" button', function(assert) {
  assert.equal(find('#settle-trip-button').length, 1);
});

test('Should show a confirm button when the user clicks on Settle Trip', function(assert) {
  click(find('#settle-trip-button')).then(function() {
    assert.equal(find('button:contains("Yes")').length, 1);
  })
});

test('Should show a cancel settle button when the user clicks to settle a trip', function(assert) {
  click(find('#settle-trip-button')).then(function() {
    assert.equal(find('button:contains("No, cancel")').length, 1);
  })
});

test('Should hide the delete payment option when the user clicks to cancel the deletion', function(assert) {
  click(find('#settle-trip-button')).then(function() {
    click(find('button:contains("No, cancel")')).then(function() {
      assert.equal(find('button:contains("No, cancel")').length, 0);
    });
  });
});

// What happens after a trip is settled?
test('Should settle the trip when the user confirms to settle trip', function(assert) {
  click(find('#settle-trip-button')).then(function() {
    click(find('button:contains("Yes")')).then(function() {
      assert.equal(find('div.standard-button:contains("Trip Settled")').length, 1);
    });
  });
});
