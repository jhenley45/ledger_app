import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Update Payment', {
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


// EDIT PAYMENT
test('Should have a button to allow the user to edit a payment from the trip if it belongs to that user', function(assert) {
  assert.equal(find('i#edit-payment').length, 1);
});

test('Should display an inline edit form when the user clicks to edit a payment', function(assert) {
  click(find('i#edit-payment')).then(function() {
    assert.equal(find('.transparent-input').length, 2);
  });
});

test('Should display an update payment button when the user clicks to edit a payment', function(assert) {
  click(find('i#edit-payment')).then(function() {
    assert.equal(find('.standard-button:contains("Update")').length, 1);
  });
});

test('Should save the payment and redisplay when the user clicks to update it', function(assert) {
  click(find('i#edit-payment')).then(function() {
    fillIn(find('#amount'), '60');
    fillIn(find('#description'), 'new underwear');
    click(find('.standard-button:contains("Update")')).then(function() {
      assert.equal(find('#payment-amount:contains("60")').length, 1);
      assert.equal(find('#payment-description:contains("new underwear")').length, 1);
    });
  });
});

test('Should show an error when no amount is provided', function(assert) {
  click(find('i#edit-payment')).then(function() {
    fillIn(find('#amount'), '');
    fillIn(find('#description'), 'new underwear');
    click(find('.standard-button:contains("Update")')).then(function() {
      assert.equal(find('div.error-message:contains("Amount field cannot be empty")').length, 1);
    });
  });
});

test('Should show an error when amount is not an integer', function(assert) {
  click(find('i#edit-payment')).then(function() {
    fillIn(find('#amount'), 'dfsd');
    fillIn(find('#description'), 'new underwear');
    click(find('.standard-button:contains("Update")')).then(function() {
      assert.equal(find('div.error-message:contains("Amount value must be a number")').length, 1);
    });
  });
});
