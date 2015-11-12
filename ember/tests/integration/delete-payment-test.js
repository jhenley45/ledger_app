import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Delete Payment', {
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


// DELETE PAYMENT
test('Should have a button to allow the user to delete a payment from the trip if it belongs to that user', function(assert) {
  triggerEvent(".payment:contains('You dropped')", "mouseenter").then(function() {
    assert.equal(find('i#remove-payment').length, 1);
  });
});

test('Should confirm that the payment should be deleted when user clicks to delete payment', function(assert) {
  triggerEvent(".payment:contains('You dropped')", "mouseenter").then(function() {
    click(find('i#remove-payment')).then(function() {
      assert.equal(find('button:contains("Yes")').length, 1);
    });
  });
});

test('Should delete the payment when the user clicks to confirm the deletion', function(assert) {
  triggerEvent(".payment:contains('You dropped')", "mouseenter").then(function() {
    click(find('i#remove-payment')).then(function() {
      click(find('button:contains("Yes")')).then(function() {
        assert.equal(find('div.payment').length, 2);
      });
    });
  });
});

test('Should display a cancel delete button when user clicks to delete payment', function(assert) {
  triggerEvent(".payment:contains('You dropped')", "mouseenter").then(function() {
    click(find('i#remove-payment')).then(function() {
      assert.equal(find('button:contains("No, cancel")').length, 1);
    });
  });
});

test('Should hide the delete payment option when the user clicks to cancel the deletion', function(assert) {
  triggerEvent(".payment:contains('You dropped')", "mouseenter").then(function() {
    click(find('i#remove-payment')).then(function() {
      click(find('button:contains("No, cancel")')).then(function() {
        assert.equal(find('button:contains("No, cancel")').length, 0);
      });
    });
  });
  click(find('i#remove-payment')).then(function() {
    click(find('button:contains("No, cancel")')).then(function() {
      assert.equal(find('button:contains("No, cancel")').length, 0);
    });
  });
});
