import Ember from "ember";

// Just use Controller not ObjectController
export default Ember.Controller.extend({

	actions: {
		addPaymentToTrip : function() {
			// clear any lingering form errors
			this.set('formError', undefined);

			var _this = this;
			var amount = this.get('amount');

			if (!amount || amount.length < 1) {
				this.set('formError', 'Amount field cannot be empty');
				return;
			} else {
				// create payment
			}
		}
	}
});
