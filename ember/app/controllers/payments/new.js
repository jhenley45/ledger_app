import Ember from "ember";

// Just use Controller not ObjectController
export default Ember.Controller.extend({

	needs: ['trip'],

	tripController : Ember.computed.alias('controllers.trip'),

	actions: {
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
				var trip = this.get('tripController').get('model');
				var payment = this.store.createRecord('payment', {
					description: description,
					amount: amount,
					trip: trip
				});
				payment.save().then(function(payment) {
					_this.transitionToRoute('trip', trip);
				}, function(error) {
					// fail
				})
			}
		}
	}
});
