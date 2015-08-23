import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - New Payment', {
  beforeEach: function() {
    App = startApp();
    visit('/trips/2').then(function() {
      click(find('button.standard-button:contains("Add a new payment")'));
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "New Payment"', function(assert) {
  assert.equal(find('h4.new-payment').text(), 'New Payment');
});


test('Should have a button to allow the user to create a new payment for the trip', function(assert) {
  assert.equal(find('button.standard-button:contains("Add payment")').length, 1);
});

test('Should display a form with input fields for the new payment', function(assert) {
  assert.equal(find('div.form-group').length, 2);
});

test('Should display an error message when no amount is provided.', function(assert) {
  fillIn(find('input#description'), 'Test Payment 4');
  click(find('button:contains("Add payment")')).then(function() {
    assert.equal(find('p.error-message:contains("Amount field cannot be empty")').length, 1);
  });
});

test('Should display an error message when amount is not an integer.', function(assert) {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), 'Monayyyy');
  click(find('button:contains("Add payment")')).then(function() {
    assert.equal(find('p.error-message:contains("Amount value must be a number")').length, 1);
  });
});

test('Should display an error message when empty string is entered.', function(assert) {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '  ');
  click(find('button:contains("Add payment")')).then(function() {
    assert.equal(find('p.error-message:contains("Amount field cannot be empty")').length, 1);
  });
});

test('Should add the payment to the list of existing trip payments after it is created.', function(assert) {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '230');
  click(find('button:contains("Add payment")')).then(function() {
    assert.equal(find('li.payment').length, 4);
  });
});

test('Should hide the new payment form after payment has been added.', function(assert) {
  fillIn(find('input#description'), 'Test Payment 4');
  fillIn(find('input#amount'), '230');
  click(find('button:contains("Add payment")')).then(function() {
    assert.equal(find('button.standard-button:contains("Add a new payment")').length, 1);
  });
});
