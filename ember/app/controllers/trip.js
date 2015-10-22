import Ember from "ember";
var $ = Ember.$;

export default Ember.ObjectController.extend({

	needs: ["application"],

	applicationController: Ember.computed.alias('controllers.application'),

	actions: {
		confirmSettleTrip: function() {
			this.set('confirmSettleTrip', true);
		},
		hideConfirmSettleTrip: function() {
			this.set('confirmSettleTrip', false);
		},
		settleTrip: function() {
			var trip = this.get('model');
			var _this = this;

			trip.set('isSettled', true);
			trip.save().then(function() {
				_this.send('flashMessage', 'Your trip has been settled. Please allow a few moments for Venmo to process', 'success');
				_this.send('hideConfirmSettleTrip');
			});
		},
		removePayment: function(payment) {
			var _this = this;
			payment.destroyRecord().then(function() {
				_this.send('flashMessage', 'Payment successfully deleted', 'success');
			}, function() {
				_this.send('flashMessage', 'An error occurred while processing your request', 'warning');
			});
		},
		deleteTrip: function(trip) {
			var _this = this;

			trip.destroyRecord().then(function() {
				_this.send('flashMessage', 'Your trip has been successfully deleted', 'success');
				_this.transitionToRoute('index');
			}, function() {
				_this.send('flashMessage', 'An error occurred while processing your request', 'warning');
			});
		},
		toggleNewPaymentForm : function() {
			this.set('isAddPaymentVisible', !this.get('isAddPaymentVisible'));
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
      		var newMember = _this.store.createRecord('user', response.user);
      		trip.get('users').addObject(newMember);
      		_this.send('flashMessage', 'Member successfully added!', 'success');
      	});
      }, function() {
      	_this.send('flashMessage', 'An error occurred while processing your request', 'warning');
      }).always(function() {
      	Ember.run(function() {
      		_this.set('isAddUserVisible', false);
      		_this.set('addUser', undefined);
      	});
      });
		},
		addPaymentToTrip : function() {
			// clear any lingering form errors
			this.set('formError', undefined);

			var _this = this;
			var amount = this.get('amount');
			var description = this.get('description');
			var user = this.get('session').get('currentUser');

			if (!amount || amount.length < 1 || $.trim(amount) === "") {
				this.set('formError', 'Amount field cannot be empty');
				return;
			} else if (isNaN(parseFloat(amount))) {
				this.set('formError', 'Amount value must be a number');
				return;
			} else {
				var trip = this.get('model');
				var payment = this.store.createRecord('payment', {
					description: description,
					amount: amount,
					trip: trip,
					user: user
				});
				payment.save().then(function() {
					_this.set('description', undefined);
					_this.set('amount', undefined);
					_this.send('flashMessage', 'New payment successfully created', 'success');
					_this.set('isAddPaymentVisible', false);
				}, function() {
					// need to destroy payment object
					_this.send('flashMessage', 'An error occurred while processing your request', 'warning');
				});
			}
		}
	},

	newPaymentButtonText : function() {
		if (this.get('isAddPaymentVisible')) {
			return '-';
		} else {
			return '+';
		}
	}.property('isAddPaymentVisible'),

	addNewUserButtonText : function() {
		if (this.get('isAddUserVisible')) {
			return '-';
		} else {
			return '+';
		}
	}.property('isAddUserVisible'),

	isCurrentUserOrganizer : function() {
		if (this.get('organizer')) {
			return this.get('organizer').get('id') === this.get('session').get('currentUser').get('id');
		}
	}.property('organizer', 'session.currentUser')
});
