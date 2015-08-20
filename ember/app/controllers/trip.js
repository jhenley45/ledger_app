import Ember from "ember";
var $ = Ember.$;

export default Ember.ObjectController.extend({

	needs: ["application"],

	applicationController: Ember.computed.alias('controllers.application'),

	actions: {
		toggleNewPaymentForm : function() {
			if (this.get('isTripRoute')) {
				this.transitionToRoute('payments.new');
			} else {
				this.transitionToRoute('trip');
			}
		},
		removePayment: function(payment) {
			var _this = this;
			payment.destroyRecord().then(function() {
				_this.send('flashMessage', 'Payment successfully deleted', true);
			}, function() {
				_this.send('flashMessage', 'An error occurred while processing your request', false);
			});
		},
		deleteTrip: function(trip) {
			var _this = this;

			trip.destroyRecord().then(function() {
				_this.send('flashMessage', 'Your trip has been successfully deleted', true);
				_this.transitionToRoute('trips');
			}, function() {
				_this.send('flashMessage', 'An error occurred while processing your request', false);
			});
		},
		toggleAddUser: function() {
			this.set('isAddUserVisible', !this.get('isAddUserVisible'));
		},
		addUserToTrip: function() {
			var username = this.get('addUser');
			var trip = this.get('model');
			var _this = this;

			$.ajax({
        type: "POST",
        url: "/api/trip_users",
        data: { username: username, trip_id: trip.get('id') }
      }).then(function(response) {
      	Ember.run(function() {
      		var newMember = _this.store.createRecord('member', response.user);
      		trip.get('members').addObject(newMember);
      		_this.send('flashMessage', 'Member successfully added!', true);
      	});
      }, function() {
      	_this.send('flashMessage', 'An error occurred while processing your request', false);
      }).always(function() {
      	Ember.run(function() {
      		_this.set('isAddUserVisible', false);
      	})
      });
		}
	},

	isTripRoute : function() {
		return this.get('applicationController.currentRouteName') === 'trip.index' ? true : false;
	}.property('applicationController.currentRouteName'),

	newPaymentButtonText : function() {
		if (this.get('isTripRoute')) {
			return 'Add a new payment';
		} else {
			return 'Cancel';
		}
	}.property('isTripRoute'),

	addNewUserButtonText : function() {
		if (this.get('isAddUserVisible')) {
			return 'Hide form';
		} else {
			return 'Add new user';
		}
	}.property('isAddUserVisible')
});
