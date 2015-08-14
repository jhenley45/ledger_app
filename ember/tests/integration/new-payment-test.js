import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - New Payment Page', {
  beforeEach: function() {
    App = startApp();
    visit('/trips/2/payments/new');
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "New Payment"', function(assert) {
  assert.equal(find('h4').text(), 'New Payment');
});


test('Should have a button to allow the user to create a new payment for the trip', function(assert) {
  assert.equal(find('button.standard-button:contains("Add payment")').length, 1);
});

test('Should display a form with input fields for the new payment', function(assert) {
  assert.equal(find('div.form-group').length, 2);
});

// test('Should change the text of the link once the user has clicked on it', function(assert) {
//   click(find('button.standard-button:contains("Add a new payment")')).then(function() {
//   	assert.equal(find('button.standard-button:contains("Cancel")').length, 1);
//   });
// });
