import Ember from "ember";
var $ = Ember.$;

export default Ember.ObjectController.extend({

	needs: ["application"],

	applicationController: Ember.computed.alias('controllers.application'),

	actions: {
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
      		var newMember = _this.store.createRecord('member', response.user);
      		trip.get('members').addObject(newMember);
      		_this.send('flashMessage', 'Member successfully added!', true);
      	});
      }, function() {
      	_this.send('flashMessage', 'An error occurred while processing your request', false);
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
					trip: trip
				});
				payment.save().then(function() {
					_this.set('description', undefined);
					_this.set('amount', undefined);
					_this.send('flashMessage', 'New payment successfully created', true);
					_this.set('isAddPaymentVisible', false);
				}, function() {
					// need to destroy payment object
					_this.send('flashMessage', 'An error occurred while processing your request', false);
				});
			}
		}
	},

	newPaymentButtonText : function() {
		if (this.get('isAddPaymentVisible')) {
			return 'Cancel';
		} else {
			return 'Add a new payment';
		}
	}.property('isAddPaymentVisible'),

	addNewUserButtonText : function() {
		if (this.get('isAddUserVisible')) {
			return 'Hide form';
		} else {
			return 'Add new user';
		}
	}.property('isAddUserVisible')
});
