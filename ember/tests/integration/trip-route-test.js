import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration - Trip Page', {
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

test('Should have a button to allow the user to create a new payment for the trip', function(assert) {
  assert.equal(find('button.standard-button:contains("Add a new payment")').length, 1);
});

test('Should display a form when the user clicks on the new payment button', function(assert) {
  click(find('button.standard-button:contains("Add a new payment")')).then(function() {
  	assert.equal(find('div.form-group').length, 2);
  });
});

test('Should change the text of the link once the user has clicked on it', function(assert) {
  click(find('button.standard-button:contains("Add a new payment")')).then(function() {
  	assert.equal(find('button.standard-button:contains("Cancel")').length, 1);
  });
});


// DELETE PAYMENT
test('Should have a button to allow the user to delete a payment from a trip', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('button.standard-button:contains("Remove payment")').length, 3);
  });
});

test('Should remove the payment from the list of trips once the user has clicked the button', function(assert) {
  visit('/trips/2').then(function() {
    click(find('button.standard-button:contains("Remove payment")').first()).then(function() {
      assert.equal(find('li.payment').length, 2);
    });
  });
});

// DELETE TRIP
test('Should have a button to allow the user to delete a payment from a trip', function(assert) {
  assert.equal(find('button.standard-button:contains("Delete trip")').length, 1);
});

test('Should redirect the user to the trips page when delete trip is clicked', function(assert) {
  click((find('button.standard-button:contains("Delete trip")'))).then(function() {
    assert.equal(find('h3:contains("All Trips")').length, 1);
  });
});

// Need to figure this out. When we transition back to trips route the trip still shows
// bc we re-run the model hook of the trips route, which hits mock server and returns 3 trips.
// test('Should delete the selected trip when delete trip is clicked', function(assert) {
//   click((find('button.standard-button:contains("Delete trip")'))).then(function() {
//     assert.equal(find('li').length, 2);
//   });
// });


// TRIP USERS
test('Should have a section with the title "Members of this trip"', function(assert) {
  assert.equal(find('h4.trip-members:contains("Members of this trip")').length, 1);
});

test('Should list the members of the trip', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('li.trip-member').length, 2);
  });
});

test('Should designate the organizer of the trip', function(assert) {
  assert.equal(find('li.trip-organizer:contains("(organizer)")').length, 1);
});

test('Should display the username of the organizer of the trip', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('li.trip-organizer:contains("test_user1")').length, 1);
  });
});

test('Should have a button to allow you to add a user to a trip', function(assert) {
  assert.equal(find('button.standard-button:contains("Add new user")').length, 1);
});

test('Should show a form to add a new user when add new user button is clicked', function(assert) {
  click((find('button.standard-button:contains("Add new user")'))).then(function() {
    assert.equal(find('button.standard-button:contains("Add user")').length, 1);
  });
});

test('Should change the text of the button when add new user button is clicked', function(assert) {
  click((find('button.standard-button:contains("Add new user")'))).then(function() {
    assert.equal(find('button.standard-button:contains("Hide form")').length, 1);
  });
});

test('Adds a new user to the list when the user clicks "Add user"', function(assert) {
  visit('/trips/2').then(function() {
    click(find('button.standard-button:contains("Add new user")')).then(function() {
     fillIn(find('input#add-user'), 'test_user5').then(function() {
      click(find('button.standard-button:contains("Add user")')).then(function() {
        assert.equal(find('li.trip-member:contains("test_user5")').length, 1);
      });
     });
    });
  });
});



