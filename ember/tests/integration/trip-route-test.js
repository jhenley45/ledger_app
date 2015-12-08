import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import signIn from '../helpers/sign-in';

var App;

module('Integration - Trip Page', {
  beforeEach: function() {
    App = startApp();
    signIn().then(function() {
      visit('/trips/1');
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have a title of "Trip 1"', function(assert) {
  assert.equal(find('#trip-title').text().trim(), 'Trip 1');
});

test('Should display a message if there are no existing payments for a trip', function(assert) {
  assert.equal(find('div.warning-block:contains("There are currently no payments for this trip")').length, 1);
});

test('Should display a list of payments for a trip when there are payments', function(assert) {
	visit('/trips/2').then(function() {
		assert.equal(find('div.payment').length, 3);
	});
});

test('Should display the username of the payment owner when it is not the current user', function(assert) {
	visit('/trips/2').then(function() {
		assert.equal(find('div.payment:contains("test_user2")').length, 2);
	});
});

test('Should display "You" as the payment owner when it is the current user', function(assert) {
	visit('/trips/2').then(function() {
		assert.equal(find('div.payment:contains("You")').length, 1);
	});
});


// DELETE TRIP
test('Should not have a button to allow the user to delete a trip if they are not the organizer', function(assert) {
  assert.equal(find('button.standard-button:contains("Delete trip")').length, 0);
});

test('Should have a button to allow the user to delete a trip if they are the organizer', function(assert) {
  visit('trips/2').then(function() {
    assert.equal(find('button.standard-button:contains("Delete trip")').length, 1);
  });
});

test('Should redirect the user to the trips page when delete trip is clicked', function(assert) {
  visit('trips/2').then(function() {
    click((find('button.standard-button:contains("Delete trip")'))).then(function() {
      assert.equal(find('h3:contains("All Trips")').length, 1);
    });
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
test('Should have a section with the title "Trip members"', function(assert) {
  assert.equal(find('#trip-members-title:contains("Trip members")').length, 1);
});

test('Should list the members of the trip', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('div.trip-member').length, 3);
  });
});

test('Should display "You" instead of the username when currentUser is organizer', function(assert) {
  visit('/trips/2').then(function() {
    assert.equal(find('div.trip-member:contains("You")').length, 1);
  });
});

test('Should have a button to allow you to add a user to a trip', function(assert) {
  assert.equal(find('div.action-button:contains("Add user")').length, 1);
});

test('Adds a new user to the list when the user clicks "Add user"', function(assert) {
  visit('/trips/2').then(function() {
   fillIn(find('input#add-user'), 'test_user5').then(function() {
    click(find('div.action-button:contains("Add user")')).then(function() {
      assert.equal(find('div.trip-member:contains("test_user5")').length, 1);
    });
   });
  });
});

test('Should clear the form after a user is successfully added', function(assert) {
  visit('/trips/2').then(function() {
    fillIn(find('input#add-user'), 'test_user5').then(function() {
      click(find('div.action-button:contains("Add user")')).then(function() {
        assert.equal(find('input#add-user').val(), "");
      });
    });
  });
});
